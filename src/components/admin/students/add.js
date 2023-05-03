import React, { useState,useEffect } from "react";
import Card from "../../card";
import { AiOutlineUserAdd } from "react-icons/ai";
import api from "../../../tools/api";
import { useDispatch, useSelector } from "react-redux";
import { MainBtn } from "../../../tools/customClasses";
import { error_toast, success_toast } from "../../../tools/notifications";
import { set_students } from "../../../redux/actions/actionCreators";
import { Toaster } from "react-hot-toast";

export default function AddStudent() {
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    cin: "",
    group: "",
    gender: "",
    tele: "",
    adress: "",
    birthday: "",
    branch: "",
    level: "",
  });
  const { branches, levels, groups } = useSelector((state) => state);
  const [availableBranchs, setAvailablseBranches] = useState([]);
  const [availableGroups, setAvailablseBGroups] = useState([]);
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [cin, setCin] = useState();
  const [group, setGroup] = useState();
  const [gender, setGender] = useState("male");
  const [branch, setBranch] = useState();
  const [tele, setTele] = useState();
  const [adress, setAdress] = useState();
  const [birthday, setBirthDaty] = useState();
  const [level, setLevel] = useState();
  const dispatch = useDispatch();
  const changeLevelHndler = async (e) => {
    setAvailablseBranches(
      branches.filter((item) => item.level === Number(e.target.value))
    );
    setAvailablseBGroups([]);
  };
  const changeBranchHndler = async (e) => {
    setAvailablseBGroups(
      groups.filter((item) => item.branch === Number(e.target.value))
    );
  };

  const submitHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/admin/student/store", {
        first_name,
        last_name,
        cin,
        group,
        gender,
        branch,
        tele,
        adress,
        birthday,
        level,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(set_students(res.data.students));
          setAdress("");
          setTele("");
          setBirthDaty("");
          setFirstName("");
          setLastName("");
          setCin("");
          setGender("male");
          success_toast(res.data.message);
        }
      })
      .catch((er) => {
        if (er.response.status === 422) {
          setErrors(er.response.data);
          error_toast("Entrer tout les information");
        }
      });
  };
  useEffect(()=>{
    document.title = "Admin - Ajouter un Stagiaire"
      },[])

  return (
    <Card title={"Ajouter un stagiaire"} icon={AiOutlineUserAdd}>
      <Toaster />

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
              <input
                value={first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                className={`bg-gray-50 border ${
                  errors.first_name && "border-red-500"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              />
            </div>
          </div>
          {/* Prenom*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Prenom :
              </label>
              <input
                value={last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                className={`bg-gray-50 border ${
                  errors.last_name && errors.last_name !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Cin*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className={`block uppercase  text-blueGray-600 text-xs font-bold mb-2`}
                htmlFor="grid-password"
              >
                Numero National (CIN) :
              </label>
              <input
                value={cin}
                onChange={(e) => {
                  setCin(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                className={`bg-gray-50 border ${
                  errors.cin && errors.cin !== null
                    ? "border-red-500"
                    : "border-gray-300"
                }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              />
            </div>
          </div>
          {/* birthday*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                date de naissance :
              </label>
              <input
                value={birthday}
                onChange={(e) => {
                  setBirthDaty(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                type="date"
                className={`bg-gray-50 border ${
                  errors.birthday && errors.birthday !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Gender*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="gender"
              >
                Sexe:
              </label>
              <div>
                <label
                  onClick={(e) => setGender("male")}
                  className="inline-flex items-center"
                >
                  <input
                    checked
                    onChange={(e) => setGender("male")}
                    type="radio"
                    className="form-radio text-blue-500"
                    name="gender"
                    value="male"
                  />
                  <span className="text-lg ml-4">Male</span>
                </label>
                <label
                  onClick={(e) => setGender("female")}
                  className="inline-flex items-center ml-6"
                >
                  <input
                    onClick={(e) => setGender("female")}
                    type="radio"
                    className="form-radio text-pink-500"
                    name="gender"
                    value="female"
                  />
                  <span className="ml-4 text-lg">Female</span>
                </label>
              </div>
            </div>
          </div>
          {/* */}
        </div>

        <hr className="border-b-1 border-blueGray-300" />
        <h6 className="text-blueGray-400 text-sm  my-6 font-bold uppercase">
          Information Du filière
        </h6>

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
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                onClick={changeLevelHndler}
                className={`bg-gray-50 border ${
                  errors.level && errors.level !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              >
                <option value={""}>Selectionner la Niveau</option>
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
              <select
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                onClick={changeBranchHndler}
                id="branch-select"
                className={`bg-gray-50 border ${
                  errors.branch && errors.branch !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              >
                <option value={""}>Selectionner la branch</option>
                {availableBranchs.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Group*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Group :
              </label>
              <select
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                className={`bg-gray-50 border ${
                  errors.group && errors.group !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              >
                <option value={""}>Selectionner le groupe</option>
                {availableGroups.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* */}
        </div>

        <hr className="border-b-1 border-blueGray-300" />
        <h6 className="text-blueGray-400 text-sm  my-6 font-bold uppercase">
          Information De Contact
        </h6>

        <div className="flex flex-wrap">
          {/* Phone*/}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                TelePhone :
              </label>
              <input
                value={tele}
                onChange={(e) => {
                  setTele(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                className={`bg-gray-50 border ${
                  errors.tele && errors.tele !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              />
            </div>
          </div>
          {/* */}
        </div>

        <div className="flex flex-wrap">
          {/*Adress */}
          <div className="w-full  px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Adress :
              </label>
              <textarea
                value={adress}
                onChange={(e) => {
                  setAdress(e.target.value);
                  e.target.classList.remove("border-red-500");
                  e.target.classList.add("border-gray-300");
                }}
                className={`bg-gray-50 border ${
                  errors.adress && errors.adress !== null
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
              ></textarea>
            </div>
          </div>
        </div>
        <button onClick={submitHandel} className={MainBtn}>
          Enregistrer nouveau Stagiaire
        </button>
      </form>
    </Card>
  );
}
