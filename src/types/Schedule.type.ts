import { UnitType } from "./Unit.type";

export interface ScheduleType {
  id?: number;
  name?: string;
  unit?: UnitType | { id: number; name: string };
  schedule_date?: Date;
}

export interface ScheduleState {
  schedules: ScheduleType[];
  selectedSchedule: ScheduleType;
}

export interface ScheduleCreate {
  name?: string;
  unit?: UnitType | { id: number; name: string };
  schedule_date?: Date;
}
