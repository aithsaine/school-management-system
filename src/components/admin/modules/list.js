import React from "react";
import { AiFillBook } from "react-icons/ai";
import Card from "../../card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ForeignBtn } from "../../../tools/customClasses";
import CreateModule from "./add";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { set_modules } from "../../../redux/actions/actionCreators";
import swal from "sweetalert";
import api from "../../../tools/api";
function Modules() {
  const {modules,options,branches,levels} = useSelector(state=>state)
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
          .delete(`api/admin/module/${id}/delete`)
          .then((res) => {
            dispatch(set_modules(res.data.modules));
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
  };  return (
    <>
      <Card title="Modules" icon={AiFillBook}>
        <h1>Modules</h1>
        <CreateModule isOpen={isOpen} onClose={onClose} />

        <button
          onClick={(e) => {
            setIsOpen(true);
          }}
          className={ForeignBtn}
        >
          Ajouter un nouveau Module
        </button>

        <div style={{ height: "500px" }}>

<table className="table-auto w-50">
  <thead className="bg-gray-50">
    <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
      <th scope="col" className="p-1  ">
        Code
      </th>

      <th scope="col" className="p-1  ">
        Module
      </th>

      <th scope="col"  className="p-1  ">
      Coefficient
      </th>
     
      <th scope="col" className="p-1  ">
        Duree <span>(heurs)</span>
      </th>
    
      <th scope="col" className="p-1  ">
        supprimer
      </th>
    </tr>
  </thead>
  <tbody className="text-sm divide-y divide-gray-100">
    {options.map((item) => {
      return (
        <>
        <tr key={uuid()+"dsd"}>
          <td colSpan={4} style={{backgroundColor:"gray",height:"30px"}}>
            <h1>{branches.find(elem=>elem.id==item.branch).name.toUpperCase()} : {item.key=="TC"?"1ére Anneé":`2éme Anneé option ${item.name.toUpperCase()}`}</h1>
          </td>
        </tr>
      
        { modules.filter(elem=>elem.option==item.id).map((element,index)=>{

          return <tr  key={uuid()}>

          <td style={{borderBottom:"2px solid black"}} data-label="nom complet" className="p-1 hover:bg-sky-400">
            {element.key}
          </td>

          <td style={{borderBottom:"2px solid black"}} data-label="Numero d'etudiant" className="p-1 hover:bg-sky-400">
            {element.title}
          </td>

          <td style={{borderBottom:"2px solid black"}} data-label="nom complet" className="p-1 hover:bg-sky-400">
            {element.coefficient}
          </td>

          <td style={{borderBottom:"2px solid black"}} data-label="nom complet" className="p-1 hover:bg-sky-400">
            {element.duration}
          </td>
         
         
          <td data-label="nom complet" className="p-1 ">
            <div className="w-full lg:text-center">
              <button
                onClick={(e) => deleteHandel(element.id)}
                title="supprimer"
                className="delete-student-btn bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
              >
                <FontAwesomeIcon icon={faTrash} className="m-0" />
              </button>
            </div>
          </td>
        </tr>
        })}
       
        </>
      );
    })}
  </tbody>
</table>
</div>
      </Card>
    </>
  );
}

export default Modules;