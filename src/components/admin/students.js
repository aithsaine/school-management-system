import React from "react";

function Students() {
  return (
    <>
      <h1>Students</h1>
      <div>
        <div className="flex flex-col bg-white rounded shadow-md hover:bg-sky-100  m-2 overflow-hidden sm:w-52">
          <img src="images/database-icon.svg" alt="" className="h-20 m-6" />

          <h2 className="text-center px-2 pb-5">Ajouter Un Stagiaire</h2>

          <a
            href="#"
            className="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500"
          >
            Know More
          </a>
        </div>
      </div>
    </>
  );
}

export default Students;
