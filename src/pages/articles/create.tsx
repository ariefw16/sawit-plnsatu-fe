import { useNavigate } from "react-router-dom";
import FormTitleBar from "../../components/ui/FormTitleBar";

export default function ArticleCreatePage() {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <FormTitleBar
        title="Create new Article"
        handlerBackButton={backButtonHandler}
        viewMode="create"
        breadcrumbs={[
          { label: "Articles Management", to: "article" },
          { label: "Create new Article" },
        ]}
      />
    </>
  );
}
