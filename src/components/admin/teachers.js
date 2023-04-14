import React from "react";
import { success_toast } from "../../tools/notifications";
import { ToastContainer } from "react-toastify";

function Teachers() {
  return (
    <>
      <h1>Formateurs</h1>

      <button onClick={(e) => success_toast("hello")}>Notify!</button>
      <ToastContainer />

      <br />
    </>
  );
}

export default Teachers;
