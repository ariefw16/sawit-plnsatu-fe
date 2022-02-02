import { useState } from "react";
import TitleBar from "../../components/ui/TitleBar";

export default function SharingSchedulePage() {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <>
      <TitleBar
        title="Sharing Schedule Topic"
        createType="dialog"
        subtitle="Manage Schedule for create article to share with Unit"
        buttonCreateText="Create New Schedule"
        handleCreateDialog={() => {
          setCreateDialog(true);
        }}
      />
    </>
  );
}
