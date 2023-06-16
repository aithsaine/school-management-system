import React,{useState  } from "react";
import Card from "../../card";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FcBookmark, FcDownload, } from "react-icons/fc";
import {  Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const PER_PAGE = 10;

export default function ExportGridNote() {
  const {assignements,groups,options,branches,levels,modules} = useSelector(state=>state);
  
  const navigate = useNavigate()
  
const downloadHandel = (id,nbr)=>{
  
       window.location.href = `http://localhost:8000/api/teacher/note/grille/download/${id}/${nbr}`
}
const [currentPage, setCurrentPage] = useState(1);

const goHandel = (item) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    warningmode: true,
  }).then((willDelete) => {
    if (willDelete) {
      if(item.status=="not started")
      {
        swal("ce module pas en cours commances", {
          icon: "error",
        })
      }
      else if(item.status=="finished")
      {
        swal("ce module est terminer", {
          icon: "error",
        })
      }
      else{

        navigate(`/formateur/note/add/${item.id}`)
      }
    }
  });
};

  const pages = Math.ceil(assignements.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  const currentData = assignements.slice(startIndex, endIndex);
  return (
    <>
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
        Controles
      </th>
      <th scope="col" className="p-1  ">
        Grille
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
          <td data-label="Group" className="p-1 ">
            {branches.find(elem=>elem.id==options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).branch).name+(options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).season==1?" 1ere anne ":" 2eme annee " ) + " group "+groups.find(elem=>elem.id==item.group).name +(options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).season==1?"":" option "+options.find(elem1=>elem1.id==modules.find(elem2=>elem2.id==item.module).option).name ) }
          </td>
          <td data-label="Module" className="p-1 ">
            {modules.find(elem=>elem.id==item.module).title}
          </td>
          <td data-label="nom complet" className="p-1 ">
          {item.notes.length==0? <span className="bg-red-100 text-red-800">no control</span>:(
            item.notes.map(elem=>{
              return<Link to={`/formateur/note/ByGroup/${item.id}/${elem}`} className="bg-green-100 m-1 text-green-800">C {elem}</Link>
            })
          )}
          </td>
          <td data-label="Telechager" className="p-1 ">
            <div className="flex">

            <button
            onClick={e=>downloadHandel(item.id,item.notes+1)}>
                {React.createElement(FcDownload,{size:"20"})}
            </button>
            <button
            onClick={e=>goHandel(item)}
            >
                {React.createElement(FcBookmark,{size:"20"})}
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
    <div className="table-pagination">
        <div className="buttons">
          <div id="pagination">
            <div className="flex justify-center items-center">
              <button id="prev"
                onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : ''}

                className="mr-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg font-bold text-gray-700 hover:bg-gray-200 transition duration-300 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fillRule="evenodd"
                    d="M10.293 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L5.414 9H17a1 1 0 010 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd" />
                </svg>
              </button>

              <span id="page">{currentPage} of {pages}</span>
              <button id="next"
                onClick={() => currentPage < pages ? setCurrentPage(currentPage + 1) : ""}
                className=" ml-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg font-bold text-gray-700 hover:bg-gray-200 transition duration-300 ease-in-out mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fillRule="evenodd"
                    d="M9.707 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 010-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
