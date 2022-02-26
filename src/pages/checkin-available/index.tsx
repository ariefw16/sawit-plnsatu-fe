import CheckinListHeader from "../../components/ui/checkin/ListHeader";
import TitleBar from "../../components/ui/TitleBar";

export default function CheckinAvailablePage() {
  return (
    <>
      <TitleBar
        title="Checkin Article"
        subtitle="List All available Article to Checkin"
        createType="no"
      />
      <CheckinListHeader />
    </>
  );
}
