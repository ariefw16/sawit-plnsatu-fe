import { useState } from "react";
import TitleBar from "../../components/ui/TitleBar";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Paper } from "@mui/material";

export default function SharingSchedulePage() {
  const [createDialog, setCreateDialog] = useState(false);
  const localizer = momentLocalizer(moment);
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" },
  ];

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
      <Paper variant="outlined" sx={{ p: 2, my: 4 }}>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Paper>
    </>
  );
}
