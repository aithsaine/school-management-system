import React from "react";
import { HalfMalf } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

const Loading = () => {
  return (
    <HalfMalf
      text={"Loading..."}
      bgColor={"#ffffff"}
      center={true}
      width={"150px"}
      height={"150px"}
    />
  );
};

export default Loading;
