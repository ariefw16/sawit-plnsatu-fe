import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckinForm from "../../components/ui/checkin/CheckinForm";
import TitleBar from "../../components/ui/TitleBar";
import { fetchSingleArticle } from "../../services/article.service";
import { fetchScheduleByDate } from "../../services/schedule.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { ArticleType } from "../../types/Article.type";
import { ScheduleType } from "../../types/Schedule.type";

export default function CheckinArticlePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.checkinSelected);
  const [data, setData] = useState<ArticleType>({});

  useEffect(() => {
    dispatch(fetchSingleArticle({ id: parseInt(id!) }));
  }, [id]);
  useEffect(() => {
    dispatch(fetchScheduleByDate({ schedule_date: data.article_date! })).then(
      (x) => {
        data.name = (x.payload as ScheduleType).name;
        data.schedule = {
          id: (x.payload as ScheduleType).id,
          name: (x.payload as ScheduleType).name,
        };
      }
    );
  }, [data.article_date]);

  const dataChangeHandler = (params: ArticleType) => {
    setData((x) => ({ ...x, ...params }));
  };

  return (
    <>
      <TitleBar
        title="Checkin Article"
        subtitle="Read Article & finish Quizzes in this page"
        createType="no"
        backButton={true}
      />
      <CheckinForm article={article} />
    </>
  );
}
