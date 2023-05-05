import React, { useEffect, useState } from "react";
import "../../../assets/styles/stepper.css";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {set_students} from "../../../redux/actions/actionCreators"
import { success_toast, error_toast } from "../../../tools/notifications";
import Card from "../../card";
import api from "../../../tools/api";
import { Toaster } from "react-hot-toast";
const UpdateStudent = ({ isOpen, onClose, student }) => {
  const steps = ["info personnel", "info scolaire", "contact"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const { branches, groups,options } = useSelector((state) => state);

  const [first_name, setFirstName] = useState("");
  const [birthday, setBirthDaty] = useState("");
  const [last_name, setLastName] = useState("");
  const [cin, setCin] = useState("");
  const [availableGroups, setAvailablseBGroups] = useState([]);
  const [level, setLevel] = useState("");
  const [tele, setTele] = useState("");
  const [adress, setAdress] = useState("");
  const [branch, setBranch] = useState("");
  const [group, setGroup] = useState("");
  const [student_number, setStudentNumber] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    setFirstName(student && student.first_name);
    setLastName(student && student.last_name);
    setCin(student && student.cin);
    setAdress(student && student.adress);
    setBirthDaty(student && student.birthday);
    setTele(student && student.tele);
    setLevel(student && student.level_id);
    setGroup(student && student.group_id);
    setBranch(student && student.branch_id);
    setStudentNumber(student && student.student_number);
    setAvailablseBGroups(
      student &&
        groups.filter((item) => item.option ==options.find(elem=>elem.id==groups.find(elem1=>elem1.id==student.group).option).id )
    );
  }, [student, branches, groups]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-10 inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <Toaster />

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <form className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Modal title
                </h3>
                <div className="flex justify-between">
                  {steps?.map((step, i) => (
                    <div
                      key={i}
                      className={`step-item ${
                        currentStep === i + 1 && "active"
                      } ${(i + 1 < currentStep || complete) && "complete"} `}
                    >
                      <div className="step">
                        {i + 1 < currentStep || complete ? (
                          <TiTick size={24} />
                        ) : (
                          i + 1
                        )}
                        <p></p>
                      </div>

                      <p className="text-gray-500 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2">
              {currentStep === 1 && (
                <Card title={"information personnnel"}>
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
                          }}
                          className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
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
                          }}
                          className={`bg-gray-50 border border-gray-300
                           text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
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
                          }}
                          className={`bg-gray-50 border                               border-gray-300
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
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
                          }}
                          type="date"
                          className={`bg-gray-50 border  border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              {currentStep === 2 && (
                <Card title={"information de branch"}>
                  <div className="flex flex-wrap">
                    {/* Group*/}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Group :
                        </label>
                        <select
                          defaultValue={group}
                          onChange={(e) => {
                            setGroup(Number(e.target.value));
                          }}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
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
                </Card>
              )}
              {currentStep === 3 && (
                <Card title={"information de contact"}>
                  <div className="flex flex-wrap">
                    {/* Phone*/}
                    <div className="w-full  px-4">
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
                          }}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
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
                          }}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {!complete && (
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={(e) => {
                  e.preventDefault();

                  if (currentStep === steps.length) {
                    api
                      .patch("api/admin/student/update", {
                        first_name,
                        last_name,
                        cin,
                        birthday,
                        group,
                        tele,
                        student_number,
                        adress,
                      })
                      .then((res) => {
                        dispatch(set_students(res.data.students))
                        success_toast(res.data.message);
                        
                      })
                      .catch((er) => {
                        error_toast("erreur");
                      });

                    setComplete(true);
                    setComplete(false);
                    setCurrentStep(1);
                  } else {
                    setCurrentStep((prev) => prev + 1);
                  }
                }}
              >
                {currentStep === steps.length ? "Finish" : "Next"}
              </button>
            )}
            <button
              onClick={(e) => {
                setComplete(false);
                setCurrentStep(1);
                setFirstName(student && student.first_name);
                setLastName(student && student.last_name);
                setCin(student && student.cin);
                setAdress(student && student.adress);
                setBirthDaty(student && student.birthday);
                setTele(student && student.tele);
                setLevel(student && student.level_id);
                setBranch(student && student.branch_id);
                setGroup(student && student.group_id);
                onClose();
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
