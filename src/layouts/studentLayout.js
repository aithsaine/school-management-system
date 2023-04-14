import React from "react";
import { Outlet } from "react-router-dom";

export default function studentLayout() {
  return (
    <div>
      studentLayout
      <Outlet />
    </div>
  );
}
