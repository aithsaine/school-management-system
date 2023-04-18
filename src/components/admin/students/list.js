import React, { useState } from "react";
import "../../../assets/styles/table.css";
import { useSelector } from "react-redux";
import Card from "../../card";
import { AiOutlineUserSwitch } from "react-icons/ai";
import FilterForm from "../../filterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ForeignBtn } from "../../../tools/customClasses";
import Modal from "../../../tools/modal";
function Students() {
  const students = useSelector((state) => state.students);
  const [isOpen, setIsOpen] = useState(false);
  const [student_number, setStudentNumber] = useState("");
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Modal
        student_number={student_number}
        onClose={onClose}
        isOpen={isOpen}
      />
      <Card title={"Liste Des Stagiaire"} icon={AiOutlineUserSwitch}>
        <Link to={"/admin/student/add"} className={ForeignBtn}>
          Ajouter un nouveau stagiaire{" "}
        </Link>
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
              <th scope="col" className="p-2 whitespace-nowrap ">
                supprimer/modifier
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
                  <td
                    data-label="nom complet"
                    className="p-2 whitespace-nowrap"
                  >
                    <div className="w-full lg:text-center">
                      <button
                        title="supprimer"
                        className="bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faTrash} className="m-0" />
                      </button>

                      <button
                        onClick={(e) => {
                          setIsOpen(true);
                          setStudentNumber(item.student_number);
                        }}
                        title="modifier"
                        className="bg-green-500 text-white py-1 px-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faSyncAlt} className="mr-0" />
                      </button>
                    </div>
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
