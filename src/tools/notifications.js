import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success_toast = (msg) => {
  return toast.success(msg, {
    hideProgressBar: true,
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
export const error_toast = (msg) => {
  return toast.error(msg, {
    hideProgressBar: true,
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
