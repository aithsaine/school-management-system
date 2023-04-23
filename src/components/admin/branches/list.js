import React, { useEffect, useState } from "react";
import Card from "../../card";
import { AiTwotoneExperiment } from "react-icons/ai";
import { ForeignBtn } from "../../../tools/customClasses";
import "../../../assets/styles/table.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBranch from "./add";
import { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import api from "../../../tools/api";
import {
  set_branches,
  set_students,
} from "../../../redux/actions/actionCreators";

export default function Branches() {
  const { branches } = useSelector((state) => state);
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
          .delete(`api/admin/branch/${id}/delete`)
          .then((res) => {
            dispatch(set_branches(res.data.branches));
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
  return (
    <div>
      <Toaster />
      <Card title="Branches" icon={AiTwotoneExperiment}>
        <button
          onClick={(e) => {
            setIsOpen(true);
          }}
          className={ForeignBtn}
        >
          Ajouter une nouvelle branches{" "}
        </button>
        <CreateBranch isOpen={isOpen} onClose={onClose} />
        <hr className="my-6" />
        <table className="table-auto w-50">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <th scope="col" className="p-1  ">
                #
              </th>

              <th scope="col" className="p-1  ">
                Nom de branch
              </th>
              <th scope="col" className="p-1  ">
                Niveau
              </th>

              <th scope="col" className="p-1  ">
                Nomber des Group
              </th>
              <th scope="col" className="p-1  ">
                supprimer
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {branches.map((item, key) => {
              return (
                <tr key={key}>
                  <td data-label="nom complet" className="p-1 ">
                    {key + 1}
                  </td>
                  <td data-label="Numero d'etudiant" className="p-1 ">
                    {item.name}
                  </td>
                  <td data-label="nom complet" className="p-1 ">
                    {item.level_name}
                  </td>

                  <td data-label="nom complet" className="p-1 ">
                    {item.groups_count}
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
