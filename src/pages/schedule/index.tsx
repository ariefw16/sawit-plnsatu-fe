import { useEffect, useState } from "react";
import TitleBar from "../../components/ui/TitleBar";
import {
  Calendar,
  Views,
  momentLocalizer,
  stringOrDate,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Paper } from "@mui/material";
import CreateScheduleDrawer from "../../components/ui/schedule/CreateScheduleDrawer";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchSchedules } from "../../services/schedule.service";
import { showToast } from "../../store/toast.store";
import DetailScheduleDrawer from "../../components/ui/schedule/DetailScheduleDrawer";
import { setSelectedSchedule } from "../../store/schedule.store";

export default function SharingSchedulePage() {
  const [createDialog, setCreateDialog] = useState(false);
  const [detailDrawer, setDetailDrawer] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [monthYear, setMonthYear] = useState<{ month: number; year: number }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const localizer = momentLocalizer(moment);
  const dispatch = useAppDispatch();
  const schedules = useAppSelector((state) =>
    state.schedule.schedules.map((x) => ({
      start: moment(x.schedule_date),
      end: moment(x.schedule_date),
      title: x.name,
      allDay: true,
      id: x.id,
    }))
  );

  useEffect(() => {
    dispatch(
      fetchSchedules({
        month: monthYear.month,
        year: monthYear.year,
      })
    )
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  }, [monthYear]);

  const rangeChangeHandler = (range: any) => {
    if ("start" in range) {
      const data = range.start as Date;
      let increment = 1;
      if (data.getDate() > 1) increment++;
      let month = data.getMonth() + increment;
      if (month > 12) month = month - 12;
      setMonthYear({ month, year: data.getFullYear() });
    }
  };

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
          onSelectEvent={(e) => {
            setDetailDrawer(true);
            dispatch(setSelectedSchedule({ id: e.id }));
          }}
          onRangeChange={rangeChangeHandler}
        />
      </Paper>
      <CreateScheduleDrawer
        open={createDialog}
        handleToggle={() => {
          setCreateDialog((x) => !x);
        }}
      />
      <DetailScheduleDrawer
        open={detailDrawer}
        handleToggle={() => {
          setDetailDrawer((x) => !x);
        }}
        id={selectedId}
      />
    </>
  );
}
