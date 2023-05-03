import React, { useState,useEffect } from "react";
import api from "../../../tools/api";
import { error_toast, success_toast } from "../../../tools/notifications";
import { useDispatch } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import Card from "../../card";
import { MainBtn } from "../../../tools/customClasses";
import { Toaster } from "react-hot-toast";
import { set_teachers } from "../../../redux/actions/actionCreators";

export default function AddTeacher() {
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    cin: "",
    gender: "",
    tele: "",
    adress: "",
    birthday: "",
  });
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [cin, setCin] = useState();
  const [gender, setGender] = useState("male");
  const [tele, setTele] = useState();
  const [adress, setAdress] = useState();
  const [birthday, setBirthDaty] = useState();
  const dispatch = useDispatch();

  const submitHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/admin/teacher/store", {
        first_name,
        last_name,
        cin,
        gender,
        tele,
        adress,
        birthday,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(set_teachers(res.data.teachers));
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
    document.title = "Admin - Ajouter Formateur"
      },[])

  return (
    <Card title={"Ajouter un formateur"} icon={AiOutlineUserAdd}>
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
          Enregistrer nouveau Formateur
        </button>
      </form>
    </Card>
  );
}
