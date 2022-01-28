import { CommonParams } from "./CommonParams.type";

export interface UnitType {
  id?: number;
  name?: string;
  parent?: UnitType;
  stiUnit?: UnitType;
  isSti?: boolean;
}

export interface FetchReturnType {
  unit?: UnitType;
  units?: UnitType[];
  totalRow?: number;
}

export interface UnitFetchParams extends CommonParams {
  name?: string;
  parentId?: number;
  stiUnitId?: number;
}
