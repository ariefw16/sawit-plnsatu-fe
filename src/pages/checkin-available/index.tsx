import CheckinListHeader from "../../components/ui/checkin/ListHeader";
import CheckinSearchBox from "../../components/ui/checkin/SearchBox";
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
      <CheckinSearchBox />
    </>
  );
}
