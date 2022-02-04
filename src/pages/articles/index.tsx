import ArticleSearchBox from "../../components/ui/articles/SearchBox";
import TitleBar from "../../components/ui/TitleBar";

export default function ArticlesPage() {
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
    </>
  );
}
