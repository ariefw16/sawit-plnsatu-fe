import { useEffect, useState } from "react";
import ArticleTable from "../../components/ui/articles/ArticleTable";
import ArticleSearchBox from "../../components/ui/articles/SearchBox";
import TitleBar from "../../components/ui/TitleBar";
import { fetchArticles } from "../../services/article.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";

export default function ArticlesPage() {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.article.articles);
  const totalRow = useAppSelector((state) => state.article.totalRow!);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchArticles({ limit: 0 }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <TitleBar
        title="Articles Management"
        subtitle="Manage All Article to sharing with all user"
        createType="redirect"
        redirectCreate="/article/create"
        buttonCreateText="Create New Article"
      />
      <ArticleSearchBox />
      <ArticleTable
        articles={articles}
        loading={loading}
        rowCount={totalRow}
        handleDeleteButton={() => {}}
      />
    </>
  );
}
