import { useNavigate } from "react-router-dom";
import FormTitleBar from "../../components/ui/FormTitleBar";

export default function UnitDetailPage() {
  const navigate = useNavigate();
  return (
    <>
      <FormTitleBar
        breadcrumbs={[{ to: "/unit", label: "Unit" }, { label: "Detail Unit" }]}
        handlerBackButton={() => {
          navigate(-1);
        }}
        handlerDeleteButton={() => {}}
        handlerUpdateButton={() => {}}
      />
    </>
  );
}
