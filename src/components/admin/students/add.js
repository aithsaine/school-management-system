import React, { useEffect, useState } from "react";
import Card from "../../card";
import { AiOutlineUserAdd } from "react-icons/ai";
import $ from "jquery";
import { useSelector } from "react-redux";

export default function AddStudent() {
  const { branches, levels } = useSelector((state) => state);
  const [availableBranchs, setAvailablseBranches] = useState([]);
  const changeLevelHndler = async () => {
    $("#level-select").click((e) => {
      setAvailablseBranches(
        branches.filter((item) => item.level_id == e.target.value)
      );
    });
  };

  return (
    <Card title={"Ajouter un stagiaire"} icon={AiOutlineUserAdd}>
      <form>
        <hr className="border-b-1 border-blueGray-300" />
        <h6 className="text-blueGray-400 text-sm  my-6 font-bold uppercase">
          Information Personnel
        </h6>

        <div className="flex flex-wrap">
          {/* Nom*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Nom :
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600" />
            </div>
          </div>
          {/* Prenom*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Prenom :
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Cin*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Numero National :
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600" />
            </div>
          </div>
          {/* birthday*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                date de naissance :
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Niveau*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Niveau :
              </label>
              <select
                id="level-select"
                onChange={changeLevelHndler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600"
              >
                <option>optionionner la Niveau</option>
                {levels.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Branch*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Branch :
              </label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600">
                <option value={""}>optionionner la branch</option>
                {availableBranchs.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}
