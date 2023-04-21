import React, { useEffect, useState } from "react";
import "../../../assets/styles/table.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../card";
import { AiOutlineUserSwitch } from "react-icons/ai";
import FilterForm from "../../filterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ForeignBtn } from "../../../tools/customClasses";
import Modal from "../../../tools/modal";

import $ from "jquery";
import api from "../../../tools/api";
import { success_toast } from "../../../tools/notifications";
import { ToastContainer } from "react-toastify";
import { set_students } from "../../../redux/actions/actionCreators";
import router from "../../../tools/router";
function Students() {
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState("");
  const onClose = (item) => {
    setIsOpen(false);
  };
  useEffect(() => {
    $(".delete-student-btn").click((e) => {
      const cin = e.currentTarget.dataset.cin;
      api.delete(`/api/admin/student/${cin}/delete`).then((res) => {
        if (res.status === 200) {
          dispatch(set_students(res.data.students));
          success_toast(res.data.message);
        }
      });
    });
  }, []);

  useEffect(() => {
    api
      .get("/api/admin/students")
      .then((res) => {
        dispatch(set_students(res.data.students));
      })
      .catch((error) => {
        if (error.response.status !== 422) return router.navigate("/login");
      });
  }, []);
  const ModalData = (data) => {
    setIsOpen(true);
    setStudent(data);
  };

  return (
    <>
      <Modal student={student} onClose={onClose} isOpen={isOpen} />
      <Card title={"Liste Des Stagiaire"} icon={AiOutlineUserSwitch}>
        <Link to={"/admin/student/add"} className={ForeignBtn}>
          Ajouter un nouveau stagiaire{" "}
        </Link>
        <FilterForm />
        <ToastContainer containerId={"a"} />
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
                        data-cin={item.cin}
                        className="delete-student-btn bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faTrash} className="m-0" />
                      </button>

                      <button
                        onClick={(e) => ModalData(item)}
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
