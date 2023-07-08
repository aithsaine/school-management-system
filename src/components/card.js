import React from "react";

export default function Card({ children, title, icon }) {
  return (
    <>
      <div className="card ">
        <div className=" mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="card-header ">
            <div className="card-header-title group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-800  hover:text-sky-700 cursor-pointer">
              <h1 className="icon">
                {icon && React.createElement(icon, { size: "25" })}
              </h1>
              {title && title}
            </div>
            <hr className="m-2" />
          </header>
          <div className="card-body py-3 overflow-y-scroll">
            <div className="overflow-x-auto resp p-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
