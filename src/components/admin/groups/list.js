import React, { useEffect, useState } from "react";
import Card from "../../card";
import { RiGroupLine } from "react-icons/ri";
import { ForeignBtn } from "../../../tools/customClasses";
import "../../../assets/styles/table.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateGroup from "./add";
import { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import api from "../../../tools/api";
import {
  set_groups,
  set_students,
} from "../../../redux/actions/actionCreators";

export default function Groups() {
  const { groups,branches,levels } = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const onClose = (item) => {
    setIsOpen(false);
  };
  const deleteHandel = (id) => {
        swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`api/admin/group/${id}/delete`)
          .then((res) => {
            dispatch(set_groups(res.data.branches));
            dispatch(set_students(res.data.students));
            swal(res.data.message, {
              icon: "success",
            });
          })
          .catch(() =>
            swal("echec de supprission", {
              icon: "error",
            })
          );
      }
    }); 
  };
  useEffect(()=>{
    document.title = "Admin - Groupes"
      },[])
  return (
    <div>
      <Toaster />
      <Card title="Groupes" icon={RiGroupLine}>
        <button
          onClick={(e) => {
            setIsOpen(true);
          }}
          className={ForeignBtn}
        >
          Ajouter un nouveau Groupes{" "}
        </button>
        <CreateGroup isOpen={isOpen} onClose={onClose} />
        <hr className="my-6" />
        <table className="table-auto w-50">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <th scope="col" className="p-1  ">
                #
              </th>

              <th scope="col" className="p-1  ">
                Group
              </th>
              <th scope="col" className="p-1  ">
                branche
              </th>

              <th scope="col" className="p-1  ">
                niveau
              </th>
              <th scope="col" className="p-1  ">
                supprimer
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {groups.map((item, key) => {
              return (
                <tr key={key}>
                  <td data-label="nom complet" className="p-1 ">
                    {key + 1}
                  </td>
                  <td data-label="Numero d'etudiant" className="p-1 ">
                     {branches.find(elem=>elem.id==item.branch).key+'-'+item.name }
                  </td>
                  <td data-label="nom complet" className="p-1">
                  {branches.find(elem=>elem.id==item.branch).name }
                  </td>

                  <td data-label="nom complet" className="p-1 ">
                  {levels.find(elem=>elem.id==branches.find(elem=>elem.id==item.branch).level ).name}
                  </td>

                  <td data-label="nom complet" className="p-1 ">
                    <div className="w-full lg:text-center">
                      <button
                        onClick={(e) => deleteHandel(item.id)}
                        title="supprimer"
                        className="delete-student-btn bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faTrash} className="m-0" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
