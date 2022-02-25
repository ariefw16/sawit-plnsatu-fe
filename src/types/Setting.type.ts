export interface SettingType {
  id?: number;
  props?: string;
  value?: string;
}

export interface SettingState {
  settings: SettingType[];
}
