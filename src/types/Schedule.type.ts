import { UnitType } from "./Unit.type";

export interface ScheduleType {
  id?: number;
  name?: string;
  unit?: UnitType | { id: number; name: string };
  schedule_date?: Date;
  createdById?: number;
  article?: { id: number; name: string };
}

export interface ScheduleState {
  schedules: ScheduleType[];
  selectedSchedule: ScheduleType;
  availableSchedule: ScheduleType[];
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
