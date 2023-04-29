import React from "react";
import Card from "../../card";
import { AiOutlineTeam } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ForeignBtn } from "../../../tools/customClasses";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import fake_image from "../../../assets/pictures/fake-profile.png";
function Teachers() {
  const teachers = useSelector((state) => state.teachers);
  return (
    <Card title="Formateurs" icon={AiOutlineTeam}>
      <Link to={"/admin/formateur/add"} className={ForeignBtn}>
        Ajouter un nouveau stagiaire{" "}
      </Link>
      <table className="table-auto w-50                                         m-6">
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
              supprimer/modifier
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {teachers.map((item, key) => {
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

      <Toaster />
    </Card>
  );
}

export default Teachers;
