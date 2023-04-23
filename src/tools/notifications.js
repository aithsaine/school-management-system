import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

export const success_toast = (msg) => {
  return toast.success(msg, {
    duration: 4000,
    position: "bottom-right",

    // Styling
    style: {
      backgroundColor: "green",
      color: "white",
    },
    className: "",

    // Custom Icon
    icon: "👏",

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};
export const error_toast = (msg) => {
  return toast.error(msg, {
    duration: 4000,
    position: "bottom-right",

    // Styling
    style: {
      backgroundColor: "red",
      color: "white",
    },
    className: "",

    // Custom Icon
    icon: "👏",

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};
