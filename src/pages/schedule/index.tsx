import { useEffect, useState } from "react";
import TitleBar from "../../components/ui/TitleBar";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Paper } from "@mui/material";
import CreateScheduleDrawer from "../../components/ui/schedule/CreateScheduleDrawer";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchSchedules } from "../../services/schedule.service";
import { showToast } from "../../store/toast.store";

export default function SharingSchedulePage() {
  const [createDialog, setCreateDialog] = useState(false);
  const localizer = momentLocalizer(moment);
  const dispatch = useAppDispatch();
  const schedules = useAppSelector((state) =>
    state.schedule.schedules.map((x) => ({
      start: moment(x.schedule_date),
      end: moment(x.schedule_date),
      title: x.name,
      allDay: true,
    }))
  );

  useEffect(() => {
    dispatch(
      fetchSchedules({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
    )
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  }, []);

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
          events={schedules}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["month"]}
        />
      </Paper>
      <CreateScheduleDrawer
        open={createDialog}
        handleToggle={() => {
          setCreateDialog((x) => !x);
        }}
      />
    </>
  );
}
