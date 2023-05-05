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
const PER_PAGE = 10;
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
  const [currentPage, setCurrentPage] = useState(1);



  const pages = Math.ceil(groups.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  const currentData = groups.slice(startIndex, endIndex);

  
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


        <div style={{height:"500px"}}>

        <table  className="table-auto w-50">
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
            {currentData.map((item, key) => {
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
        </div>
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


    </div>
  );
}
