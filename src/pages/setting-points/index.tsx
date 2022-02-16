import FormTitleBar from "../../components/ui/FormTitleBar";

export default function SettingPointPage() {
  return (
    <>
      <FormTitleBar
        title="Settings"
        viewMode="create"
        handlerBackButton={() => {}}
        breadcrumbs={[{ label: "Settings" }]}
        isView={false}
        handlerCreateButton={() => {}}
      />
    </>
  );
}
