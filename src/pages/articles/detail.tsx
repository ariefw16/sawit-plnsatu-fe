import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleUpdateForm from "../../components/ui/articles/UpdateForm";
import ArticleViewForm from "../../components/ui/articles/ViewForm";
import DeleteDialog from "../../components/ui/DeleteDialog";
import FormTitleBar from "../../components/ui/FormTitleBar";
import {
  deleteArticle,
  fetchSingleArticle,
  updateArticle,
} from "../../services/article.service";
import { fetchScheduleByDate } from "../../services/schedule.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";
import { ArticleType } from "../../types/Article.type";
import { ScheduleType } from "../../types/Schedule.type";

export default function ArticleDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.selectedArticle);
  const [isView, setIsView] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [data, setData] = useState<ArticleType>({});

  useEffect(() => {
    dispatch(fetchSingleArticle({ id: parseInt(id!) }));
  }, [id]);
  useEffect(() => {
    dispatch(fetchScheduleByDate({ schedule_date: data.article_date! })).then(
      (x) => {
        data.name = (x.payload as ScheduleType)?.name;
        data.schedule = {
          id: (x.payload as ScheduleType)?.id,
          name: (x.payload as ScheduleType)?.name,
        };
      }
    );
  }, [data.article_date]);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const deleteButtonHandler = () => {
    setDeleteDialog(true);
  };
  const closeDeleteHandler = () => {
    setDeleteDialog(false);
  };
  const deleteDataHandler = () => {
    dispatch(deleteArticle({ id: parseInt(id!) }))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Deletion Article Success!" })
        );
        navigate("/article");
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const updateButtonHandler = () => {
    setIsView(false);
    setData(Object.assign({}, article));
  };
  const cancelButtonHandler = () => {
    setIsView(true);
  };
  const submitEditHandler = () => {
    dispatch(updateArticle(data))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Update Article Success!" })
        );
        setIsView(true);
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const dataChangeHandler = (params: ArticleType) => {
    setData((x) => ({ ...x, ...params }));
  };

  return (
    <>
      <FormTitleBar
        title="Article Detail"
        viewMode="detail"
        handlerBackButton={backButtonHandler}
        breadcrumbs={[
          { label: "Article management", to: "/article" },
          { label: "Detail Article" },
        ]}
        isView={isView}
        handlerDeleteButton={deleteButtonHandler}
        handlerUpdateButton={updateButtonHandler}
        handlerCancelEditButton={cancelButtonHandler}
        handlerSubmitEdit={submitEditHandler}
      />
      {isView ? (
        <ArticleViewForm />
      ) : (
        <ArticleUpdateForm
          article={data}
          handleDataChange={dataChangeHandler}
        />
      )}
      <DeleteDialog
        open={deleteDialog}
        data={{ id: article.id!, name: article.name! }}
        handleClose={closeDeleteHandler}
        handleDelete={deleteDataHandler}
      />
    </>
  );
}
