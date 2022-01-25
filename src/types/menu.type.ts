import React from "react";

export interface MenuType {
  label: string;
  to: string;
  icon?: React.ReactElement;
  section: "app" | "admin" | "foot-extra";
}
