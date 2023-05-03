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

import api from "../../../tools/api";
import { set_students } from "../../../redux/actions/actionCreators";
import UpdateStudent from "./update";
import { Toaster } from "react-hot-toast";
import swal from "sweetalert";
function Students() {
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState("");
  const onClose = () => {
    setIsOpen(false);
  };

  const deleteHandel = (cin) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`api/admin/student/${cin}/delete`)
          .then((res) => {
            dispatch(set_students(res.data.students));
            swal(res.data.message, {
              icon: "success",
            });
          })
          .catch((err) =>
            swal("echec de supprission", {
              icon: "error",
            })
          );
      }
    });
  };

  const ModalData = (data) => {
    setIsOpen(true);
    setStudent(data);
  };
  useEffect(()=>{
    document.title = "Admin - Stagiaires"
      },[])


  return (
    <>
      <UpdateStudent student={student} onClose={onClose} isOpen={isOpen} />
      <Card title={"Liste Des Stagiaire"} icon={AiOutlineUserSwitch}>
        <Link to={"/admin/student/add"} className={ForeignBtn}>
          Ajouter un nouveau stagiaire{" "}
        </Link>
        <FilterForm />
        <table className="table-auto w-50">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <th scope="col" className="p-1  ">
                Nom Complet
              </th>
              <th scope="col" className="p-1  ">
                Numero d'etudiant
              </th>
              <th scope="col" className="p-1  ">
                Email
              </th>
              <th scope="col" className="p-1  ">
                Sexe
              </th>

              <th scope="col" className="p-1  ">
                Niveau
              </th>
              <th scope="col" className="p-1  ">
                Branch
              </th>
              <th scope="col" className="p-1  ">
                Group
              </th>
              <th scope="col" className="p-1  ">
                supprimer/modifier
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {students.map((item, key) => {
              return (
                <tr key={key}>
                  <td data-label="NOM COMPLETE" className="p-1 ">
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
                  <td data-label="Numero d'etudiant" className="p-1 ">
                    {item.student_number}
                  </td>
                  <td data-label="nom complet" className="p-1 ">
                    {item.email}
                  </td>
                  <td data-label="nom complet" className="p-1 ">
                    {item.gender}
                  </td>

                  <td data-label="nom complet" className="p-1 ">
                    {item.level}
                  </td>
                  <td data-label="nom complet" className="p-1 ">
                    {item.branch}
                  </td>
                  <td data-label="nom complet" className="p-1 ">
                    {item.group}
                  </td>
                  <td data-label="nom complet" className="p-1 ">
                    <div className="w-full lg:text-center">
                      <button
                        onClick={(e) => deleteHandel(item.cin)}
                        title="supprimer"
                        data-cin={item.cin}
                        className=" bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
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
        <Toaster />
      </Card>
    </>
  );
}

export default Students;
