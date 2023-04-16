import React from "react";
import "../../../assets/styles/table.css";
import { useSelector } from "react-redux";
import Card from "../../card";
import { AiOutlineUserSwitch } from "react-icons/ai";

function Students() {
  const students = useSelector((state) => state.students);
  return (
    <>
      <Card title={"Liste Des Stagiaire"} icon={AiOutlineUserSwitch}>
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <th scope="col" className="p-2 whitespace-nowrap ">
                Code
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Nom
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Prenom
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Branch
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Email
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Niveau
              </th>
              <th
                colSpan={2}
                scope="col"
                className="p-2 text-center whitespace-nowrap"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {students.map((item, key) => {
              return (
                <tr key={key}>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.student_number}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.first_name}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.last_name}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.branch}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.email}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.level}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    <button
                      className="bg-red-200 rounded-full text-red-500"
                      style={{ width: "80px" }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default Students;
