import { CommonParams } from "./CommonParams.type";
import { UnitType } from "./Unit.type";

export interface UserType {
  id?: number;
  name?: string;
  username?: string;
  nik?: string;
  email?: string;
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

export interface UserCreateType {
  name?: string;
  username?: string;
  nik?: string;
  password?: string;
  email?: string;
  unit?: { id: number; name: string };
  role?: string;
}

export interface UserUpdateType {
  id?: number;
  name?: string;
  username?: string;
  nik?: string;
  password?: string;
  email?: string;
  unit?: { id: number; name: string };
  role?: { id: number; name: string };
}

export interface UserSearchType extends Partial<CommonParams> {
  q?: string;
  unitId?: number;
}
