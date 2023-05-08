import React,{useEffect,useState} from "react";
import Card from "../../card";
import { AiOutlineTeam } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ForeignBtn } from "../../../tools/customClasses";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import fake_image from "../../../assets/pictures/fake-profile.png";
const PER_PAGE = 8;
function Teachers() {
  const teachers = useSelector((state) => state.teachers);
  const [currentPage, setCurrentPage] = useState(1);



  const pages = Math.ceil(teachers.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  const currentData = teachers.slice(startIndex, endIndex);
  useEffect(()=>{
    document.title = "Admin - Formateurs"
      },[])

  return (
    <>
    <Card title="Formateurs" icon={AiOutlineTeam}>
      <Link to={"/admin/formateur/add"} className={ForeignBtn}>
        Ajouter un nouveau Formateur{" "}
      </Link>
      <div style={{height:"500px"}}>

      <table className="table-auto w-50 my-4">
        <thead className="bg-gray-50">
          <tr className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <th scope="col" className="p-1">
              Nom Complet
            </th>
            <th scope="col" className="p-1  ">
              cin
            </th>
            <th scope="col" className="p-1  ">
              Email
            </th>
            <th scope="col" className="p-1  ">
              Sexe
            </th>
            <th scope="col" className="p-1  ">
              action
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {currentData.map((item, key) => {
            return (
              <tr key={key}>
                <td data-label="NOM COMPLETE" className="p-1 ">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                      <img className="rounded-full" src={fake_image} />
                    </div>
                    <div className="font-medium text-gray-800">
                      {item.first_name} {item.last_name}
                    </div>
                  </div>
                </td>
                <td data-label="Numero d'etudiant" className="p-1 ">
                  {item.cin}
                </td>
                <td data-label="nom complet" className="p-1 ">
                  {item.email}
                </td>
                <td data-label="nom complet" className="p-1 ">
                  {item.gender}
                </td>

                <td data-label="nom complet" className="p-1 ">
                  <div className="w-full lg:text-center">
                    <button
                      title="supprimer"
                      className=" bg-red-500 mx-2 text-white py-1 px-2 rounded-full"
                    >
                      <FontAwesomeIcon icon={faTrash} className="m-0" />
                    </button>

                    <button
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

export default Teachers;
