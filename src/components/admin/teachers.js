import React from "react";
import { success_toast } from "../../tools/notifications";
import { ToastContainer } from "react-toastify";
import Card from "../card";
import { AiOutlineTeam } from "react-icons/ai";

function Teachers() {
  return (
    <Card title="Formateurs" icon={AiOutlineTeam}>
      <button onClick={(e) => success_toast("hello")}>Notify!</button>
      <ToastContainer />
    </Card>
  );
}

export default Teachers;
