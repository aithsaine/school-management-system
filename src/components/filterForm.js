import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../tools/api";
import { filter_students } from "../redux/actions/actionCreators";

function FilterForm() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [level, setLevel] = useState("");
  const { branches, levels, students } = useSelector((state) => state);
  const [availableGroups, setAvailableGroups] = useState([]);
  const dispatch = useDispatch();
  const submitHandel = (e) => {
    e.preventDefault();
    api
      .get(
        `api/admin/students/filter?name=${name}&branch=${branch}&level=${level}`
      )
      .then((res) => {
        dispatch(filter_students(res.data.students));
      });
  };

  return (
    <form
      onSubmit={submitHandel}
      style={{ boxShadow: "2px 2px 2px gray" }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-lg mb-2">
            Nom
          </label>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg text-gray-700 font-bold mb-2"
          >
            Niveau
          </label>
          <select
            value={level}
            onChange={(event) => {
              setLevel(event.target.value);
              setBranch("");
              setAvailableGroups(
                branches.filter(
                  (item) => item.level == Number(event.target.value)
                )
              );
            }}
            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}
          >
            <option value="">Selectionner le niveau</option>
            {levels.map((item, key) => (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-lg text-gray-700 font-bold mb-2"
          >
            Branch
          </label>
          <select
            value={branch}
            onChange={(event) => {
              setBranch(event.target.value);
            }}
            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}
          >
            <option value="">Selectionner le niveau</option>
            {availableGroups.map((item, key) => (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            &nbsp;
          </label>
          <button
            type="submit"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            Chercher
          </button>
        </div>
      </div>
    </form>
  );
}

export default FilterForm;
