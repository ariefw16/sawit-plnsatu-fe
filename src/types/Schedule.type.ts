import { UnitType } from "./Unit.type";

export interface ScheduleType {
  id?: number;
  name?: string;
  unit?: UnitType | { id: number; name: string };
  schedule_date?: Date;
  createdById?: number;
}

export interface ScheduleState {
  schedules: ScheduleType[];
  selectedSchedule: ScheduleType;
}

export interface ScheduleCreateType {
  name?: string;
  unit?: UnitType | { id: number; name: string };
  schedule_date?: Date | null;
  createdById?: number;
}

export interface ScheduleUpdateType {
  name?: string;
  unit?: UnitType | { id: number; name: string };
  schedule_date?: Date | null;
  createdById?: number;
  id?: number;
}
