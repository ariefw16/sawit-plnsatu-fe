import { UnitType } from "./Unit.type";

export interface UserType {
  id?: number;
  name?: string;
  username?: string;
  nik?: string;
  password?: string;
  unit?: UnitType;
}

export interface UserState {
  users: UserType[];
  selectedUser: UserType;
  totalRow?: number;
}

export interface FetchUserReturnType {
  selectedUser: UserType;
  users: UserType[];
  totalRow?: number;
}
