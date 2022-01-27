export interface HeadCell<T> {
  disablePadding: boolean;
  label: string;
  numeric: boolean;
  id: keyof T;
}
