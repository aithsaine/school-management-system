import React from "react";
import Card from "../card";
import { AiFillBook } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "../../../src/assets/styles/buttons.css";
import api from "../../tools/api";
import { Toaster } from "react-hot-toast";
import { set_assignement } from "../../redux/actions/actionCreators";
import { success_toast } from "../../tools/notifications";
import swal from "sweetalert";

export default function TeacherModules() {
  const { user, assignements, groups, options, teacher, branches, modules } =
    useSelector((state) => state);

  const UniqueGroups = [
    ...new Map(assignements.map((v) => [v.group, v])).values(),
  ];
  const dispatch = useDispatch();
  const start_module = ($id,group_id)=>{
    swal({
      title: "vous etes sure?",
      text: "Une fois approuvé, vous ne pourrez plus récupérer le statut du modèle !",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
    api.
    patch("api/teacher/module/start",{id_assignement:$id,teacher:teacher.id,group:group_id}).then(res=>{
      dispatch(set_assignement(res.data.assignements))
      success_toast(res.data.message);

    }).catch(err=>{
      swal(err.response.data.message, {
        icon: "error",
      })
    })
  }
});
  }

  const end_module = ($id)=>{
   
    swal({
      title: "vous etes sure?",
      text: "Une fois terminer le module, vous ne pourrez plus récupérer le statut !",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
    api.
    patch("api/teacher/module/end",{id_assignement:$id,teacher:teacher.id}).then(res=>{
      dispatch(set_assignement(res.data.assignements))
      success_toast(res.data.message);

    }).catch(err=>{
      swal(err.response.data.message, {
        icon: "error",
      })
    })
  }
});
  }
  return (
    <Card title="les module" icon={AiFillBook}>
      <Toaster />
      <table className="table-auto w-50">
        <thead className="bg-gray-50">
          <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <th scope="col" className="p-1  ">
              Code
            </th>

            <th scope="col" className="p-1  ">
              Module
            </th>

            <th scope="col" className="p-1  ">
              Coefficient
            </th>

            <th scope="col" className="p-1  ">
              Duree <span>(heurs)</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {UniqueGroups.map((item) => {
            return (
              <>
                <tr key={item.group}>
                  <td
                    colSpan={5}
                    style={{ backgroundColor: "gray", height: "30px" }}
                  >
                    <h1 className="text-center">
                      {branches
                        .find(
                          (elem) =>
                            elem.id ==
                            options.find(
                              (elem2) =>
                                elem2.id ==
                                modules.find((elem3) => elem3.id == item.module)
                                  .option
                            ).branch
                        )
                        .name.toUpperCase()}{" "}
                      {options.find(
                        (elem) =>
                          elem.id ==
                          modules.find((elem2) => elem2.id == item.module)
                            .option
                      ).key == "TC"
                        ? "1ére Anneé"
                        : `2éme Anneé option ${options
                            .find(
                              (elem) =>
                                elem.id ==
                                modules.find((elem2) => elem2.id == item.module)
                                  .option
                            )
                            .name.toUpperCase()}`}{" "}
                      group {groups.find((elem) => elem.id == item.group).name}
                    </h1>
                  </td>
                </tr>
                {assignements
                  .filter((elem) => elem.group == item.group)
                  .map((element, index) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{ borderBottom: "2px solid black" }}
                          data-label="nom complet"
                          className="p-1 "
                        >
                          {
                            modules.find((elem1) => elem1.id == element.module)
                              .key
                          }
                        </td>

                        <td
                          style={{ borderBottom: "2px solid black" }}
                          data-label="Numero d'etudiant"
                          className="p-1"
                        >
                          {
                            modules.find((elem1) => elem1.id == element.module)
                              .title
                          }
                        </td>

                        <td
                          style={{ borderBottom: "2px solid black" }}
                          data-label="nom complet"
                          className="p-1"
                        >
                          {
                            modules.find((elem1) => elem1.id == element.module)
                              .coefficient
                          }
                        </td>

                        <td
                          style={{ borderBottom: "2px solid black" }}
                          data-label="nom complet"
                          className="p-1"
                        >
                          {
                            modules.find((elem1) => elem1.id == element.module)
                              .duration
                          }
                        </td>

                        <td data-label="nom complet" className="p-1 ">
                          <div className="w-full lg:text-center">
                            {element.status=="not started"?
                             <button 
                             style={{width:"90px"}}
                             className="icon-start"
                             onClick={e=>start_module(element.id,element.group)}
                             >
                              {/* <i className="fas fa-star"></i>*/  }Commancer
                            </button> : (element.status=="started"?
                            <button 
                            style={{width:"90px"}}
                            className="icon-end bg-red-800"
                            onClick={e=>end_module(element.id)}
                            >
                               <i className="fas fa-check"></i>  Terminer
                            </button>:"**************")
                             }
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
