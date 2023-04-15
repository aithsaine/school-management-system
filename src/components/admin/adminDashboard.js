import React from "react";
import Card from "../card";
import { MdOutlineDashboard } from "react-icons/md";

function AdminDashboard() {
  return (
    <>
      <Card title="Dashboard" icon={MdOutlineDashboard}>
        <h1>dashboard</h1>
      </Card>
    </>
  );
}

export default AdminDashboard;
