import React from "react";
import Card from "../../card";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FcDownload } from "react-icons/fc";
import api from "../../../tools/api"

export default function ExportGridNote() {
    const {user,assignements,groups,options,branches,levels,modules} = useSelector(state=>state);
   

const downloadHandel = (id,nbr)=>{
  
       window.location.href = `http://localhost:8000/api/teacher/note/grille/download/${id}/${nbr}`
}

  return (
    <Card title="Exporter la grille des note" icon={AiOutlineUser}>
         <div style={{ height: "500px" }}>

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
        Module
      </th>
      <th scope="col" className="p-1  ">
        Grille
      </th>
   
    </tr>
  </thead>
  <tbody className="text-sm divide-y divide-gray-100">
    {assignements.map((item, key) => {
      return (
        <tr key={key}>

          <td data-label="nom complet" className="p-1 ">
            {key + 1}
          </td>
          <td data-label="Group" className="p-1 ">
            {branches.find(elem=>elem.id==options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).branch).name+(options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).season==1?" 1ere anne ":" 2eme annee " ) + " group "+groups.find(elem=>elem.id==item.group).name +(options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).season==1?"":" option "+options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).name ) }
          </td>
          <td data-label="Module" className="p-1 ">
            {modules.find(elem=>elem.id==item.module).title}
          </td>
          <td data-label="Telechager" className="p-1 ">
            <button
            onClick={e=>downloadHandel(item.id,item.notes+1)}>
                {React.createElement(FcDownload,{size:"20"})}
            </button>
          </td>
        
      
        </tr>
      );
    })}
  </tbody>
</table>
</div>
    </Card>
  );
}
