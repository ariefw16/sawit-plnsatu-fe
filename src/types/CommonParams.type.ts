export interface HeadCell<T> {
  disablePadding: boolean;
  label: string;
  numeric: boolean;
  id: keyof T;
}

export interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export interface CommonParams {
  page?: number;
  limit: number;
  q?: string;
}

export interface ToastType {
  message: string;
  type: "success" | "info" | "error" | "warning";
  open?: boolean;
}
