import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CheckinForm from "../../components/ui/checkin/CheckinForm";
import QuizCheckinForm from "../../components/ui/checkin/QuizCheckinForm";
import TitleBar from "../../components/ui/TitleBar";
import { fetchCheckinArticle } from "../../services/checkin.service";
import { useAppDispatch, useAppSelector } from "../../store";

export default function CheckinArticlePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCheckinArticle({ id: parseInt(id!) }));
  }, [id]);

  return (
    <>
      <TitleBar
        title="Checkin Article"
        subtitle="Read Article & finish Quizzes in this page"
        createType="no"
        backButton={true}
      />
      <CheckinForm />
      <QuizCheckinForm />
    </>
  );
}
