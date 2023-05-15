import React from "react";
import { Toaster } from "react-hot-toast";
import Card from "../../card";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ForeignBtn } from "../../../tools/customClasses";
import { useState } from "react";
import CreateAssign from "./assign";
import api from "../../../tools/api";
import { set_assignement } from "../../../redux/actions/actionCreators";
import { error_toast, success_toast } from "../../../tools/notifications";
import swal from "sweetalert";
const PER_PAGE = 8;
export default function Assigns() {

  const { assignements, groups, branches, options, modules, teachers } =
    useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);



  const pages = Math.ceil(assignements.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  const currentData = assignements.slice(startIndex, endIndex);

  
  
  const deleteHadel = (id)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
    api.delete("api/admin/affectaion/delete",{data:{assign:id}}).then((res) => {
      dispatch(set_assignement(res.data.assignements));
      success_toast(res.data.message);
    })
    .catch((er) => {
      error_toast(er.response.data.message);
    });
  }    });

  }
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };
  const onClose = (item) => {
    setIsOpen(false);
  };
  return (
    <>
      <Card title={"affecter un formateur"} icon={AiOutlineUserAdd}>
        <CreateAssign isOpen={isOpen} onClose={onClose} />

        <button
          onClick={(e) => {
            setIsOpen(true);
          }}
          className={ForeignBtn}
        >
          Affecter un Formateur au module
        </button>
        <div style={{ height: "500px" }}>
          <table className="table-auto w-50 my-4">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <th scope="col" className="p-1">
                  formateur
                </th>
                <th scope="col" className="p-1  ">
                  Module
                </th>
                <th scope="col" className="p-1  ">
                  group
                </th>
                <th scope="col" className="p-1 ">
                  status
                </th>
                <th scope="col" className="p-1  ">
                  Supprimer
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {currentData.map((item, key) => {
                return (
                  <tr key={key}>
                    <td data-label="NOM COMPLETE" className="p-1 ">
                      {/* {teachers.find(elem=>elem.id===item.teacher).first_name.toUpperCase()} {teachers.find(elem=>elem.id===item.teacher).last_name.toUpperCase()} */}
                      <select
                        onChange={(e) => {
                          api
                            .patch("api/admin/affectaion/update", {
                              teacher: e.target.value,
                              assign: item.id,
                            })
                            .then((res) => {
                              dispatch(set_assignement(res.data.assignements));
                              success_toast(res.data.message);
                            })
                            .catch((er) => {
                              error_toast(er.response.data.message);
                            });
                        }}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                      >
                        {teachers.map((elem, key) => (
                          <option
                            selected={elem.id == item.teacher}
                            key={elem.id}
                            value={elem.id}
                          >
                            {elem.first_name + " " + elem.last_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td data-label="Numero d'etudiant" className="p-1 ">
                      {modules.find((elem) => elem.id == item.module).title}
                    </td>
                    <td data-label="nom complet" className="p-1 ">
                      {branches.find(
                        (elem) =>
                          elem.id ==
                          options.find(
                            (elem1) =>
                              elem1.id ==
                              groups.find((elem2) => elem2.id == item.group)
                                .option
                          ).branch
                      ).key +
                        "-" +
                        (options.find(
                          (elem) =>
                            elem.id ==
                            groups.find((elem1) => elem1.id == item.group)
                              .option
                        ).key !== "TC"
                          ? options.find(
                              (elem) =>
                                elem.id ==
                                groups.find((elem2) => elem2.id == item.group)
                                  .option
                            ).key + "-"
                          : "") +
                        groups.find((elem) => elem.id == item.group).name}
                    </td>
                    <td className="text-center">
                      <span
                        className={classNames(
                          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                          item.status == "finished"
                            ? "bg-green-100 text-green-800"
                            : null,
                          item.status == "in progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : null,
                          item.status == "not started"
                            ? "bg-red-100 text-red-800"
                            : null
                        )}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td data-label="nom complet" className="p-1 ">
                      <div className="w-full lg:text-center">
                        <button
                        onClick={e=>deleteHadel(item.id)}
                          title="supprimer"
                          className=" bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
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
        </div>
        <Toaster />

      </Card>
      <div class="table-pagination">
                        <div class="buttons">
                            <div id="pagination">
                                <div class="flex justify-center items-center">
                                    <button id="prev"
                                    onClick={() => currentPage>1?setCurrentPage(currentPage-1):''}

                                        class="mr-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg font-bold text-gray-700 hover:bg-gray-200 transition duration-300 ease-in-out">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10.293 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L5.414 9H17a1 1 0 010 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>

                                    <span id="page">{currentPage} of {pages}</span>
                                    <button id="next"
                                    onClick={() =>currentPage<pages?setCurrentPage(currentPage+1):""}
                                        class=" ml-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg font-bold text-gray-700 hover:bg-gray-200 transition duration-300 ease-in-out mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M9.707 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 010-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    </>
  );
}
