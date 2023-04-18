import React from "react";
import "../../../assets/styles/table.css";
import { useSelector } from "react-redux";
import Card from "../../card";
import { AiOutlineUserSwitch } from "react-icons/ai";
import FilterForm from "../../filterForm";

function Students() {
  const students = useSelector((state) => state.students);
  return (
    <>
      <Card title={"Liste Des Stagiaire"} icon={AiOutlineUserSwitch}>
        <FilterForm />
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <th scope="col" className="p-2 whitespace-nowrap ">
                Nom Complet
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Numero d'etudiant
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Email
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Sexe
              </th>

              <th scope="col" className="p-2 whitespace-nowrap ">
                Niveau
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Branch
              </th>
              <th scope="col" className="p-2 whitespace-nowrap ">
                Group
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {students.map((item, key) => {
              return (
                <tr key={key}>
                  <td
                    data-label="NOM COMPLETE"
                    className="p-2 whitespace-nowrap"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={`https://avatars.dicebear.com/v2/initials/${item.first_name[0]}-${item.last_name[0]}.svg`}
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        {item.first_name} {item.last_name}
                      </div>
                    </div>
                  </td>
                  <td
                    data-label="Numero d'etudiant"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.student_number}
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
                    {item.gender}
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
                    {item.branch}
                  </td>
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    {item.group}
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
