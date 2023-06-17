import React from "react";
import { HalfMalf, DoubleBubble} from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

const Loading = () => {
  return (
    <DoubleBubble
      text={"Loading..."}
      bgColor={"#ffffff"}
      center={true}
      width={"150px"}
      height={"150px"}
    />
  );
};

export default Loading;
