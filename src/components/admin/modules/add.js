import React, { useState } from "react";
import Card from "../../card";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../tools/api";
import { success_toast, error_toast } from "../../../tools/notifications";
import { Toaster } from "react-hot-toast";
import { set_modules } from "../../../redux/actions/actionCreators";

const CreateModule = ({ isOpen, onClose }) => {
    const { levels, branches, options } = useSelector((state) => state);
    const [level, setLevel] = useState("");
    const [title, setTitle] = useState("");
    const [branch, setBranch] = useState("")
    const [option, setOption] = useState(-1);
    const [season, setSeason] = useState(1);
    const [duration, setDuration] = useState('');
    const [coefficient, setCoefficient] = useState('');
    const [key,setKey] = useState("");
    const dispatch = useDispatch();
    const [availableBranchs, setAvailablseBranches] = useState([]);
    const [availableOptions, setAvailablseOptions] = useState([]);
    const saveHandel = () => {
        api
            .post("/api/admin/module/store", { option, branch, season, title, key, duration,coefficient })
            .then((res) => {
                dispatch(set_modules(res.data.modules));
                success_toast(res.data.message);
                document.forms[0].reset()
                setTitle("")
                setKey("")
                setCoefficient("")
                setDuration("")
                setSeason(1)
                setBranch("")
                setLevel("")
                setOption(-1)
            })
            .catch((er) => {
                error_toast(er.response.data.message);
            });
    };
    const changeLevelHndler = async (e) => {
        setAvailablseBranches(
            branches.filter((item) => item.level === Number(e.target.value))
        );
    };
    const changeBranchHndler = async (e) => {
        setAvailablseOptions(
            options.filter(item => item.branch == Number(e.target.value) && item.key !== "TC")
        )
    }
    return (
        <div
            className={`${isOpen ? "block" : "hidden"
                } fixed z-10 inset-0 overflow-y-auto`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <Toaster />
            <div  className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                                    Ajouter une Nouveau Module
                                </h3>
                                <div className="flex justify-between"></div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Card title={"nouvelle branch"}>
                                <div className="flex flex-wrap">
                                    {/*Level */}
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                {" "}
                                                Niveau :
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    setLevel(Number(e.target.value));
                                                }}
                                                onClick={changeLevelHndler}

                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                                            >
                                                <option value={""}>Selectionner le groupe</option>
                                                {levels.map((item, key) => (
                                                    <option value={item.id} key={key}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap">
                                    {/*branche */}
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                {" "}
                                                Branche :
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    setBranch(Number(e.target.value));
                                                }}
                                                onClick={changeBranchHndler}


                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
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
                                    {/* L'Anneé*/}
                                    <div className="w-full  px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Choisie L'Anneé :
                                            </label>
                                            <div className="m-2 p-1">
                                                <span onClick={e => {
                                                    setSeason(1)
                                                    setOption(-1)
                                                }} className="p-2">

                                                    <input id="1stDegree" className=" " type="radio" value="1" name="season" />
                                                    <label htmlFor="1stDegree" className="text-sm">1ére anneé</label>
                                                </span>
                                                <span onClick={e => setSeason(2)} className="p-2">

                                                    <input id="2ndDegree" type="radio" value="2" name="season" />
                                                    <label htmlFor="2ndDegree" className="text-sm">2éme anneé</label>
                                                </span>

                                            </div>

                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                                <div className={`flex flex-wrap ${season == 1 ? "hidden" : ''}`}>
                                    {/*Options */}
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                {" "}
                                                Option :
                                            </label>
                                            <select
                                                value={option}
                                                onChange={(e) => {
                                                    setOption(Number(e.target.value));
                                                }}

                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                                            >
                                                <option value={""}>Selectionner l'option</option>
                                                {availableOptions.map((item, index) => (
                                                    <option value={item.id} key={index}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap">
                                    {/* Nom de group*/}
                                    <div className="w-full  px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Nom de Module :
                                            </label>
                                            <input
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                                            />
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                                
                                <div className="flex flex-wrap">
                                    {/* Mot Clé*/}
                                    <div className="w-full  px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Mot Clé  <span className="text-xs text-gray-500">(example M101,EGTS,M201,M202 ...)</span>:
                                            </label>
                                            <input
                                                value={key}
                                                onChange={(e) => {
                                                    setKey(e.target.value);
                                                }}
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                                            />
                                        </div>
                                    </div>
                                    {/* */}
                                </div>

                                
                                <div className="flex flex-wrap">
                                    {/* duration*/}
                                    <div className="w-full  px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Duree :
                                            </label>
                                            <input
                                                value={duration}
                                                onChange={(e) => {
                                                    setDuration(e.target.value);
                                                }}
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                                            />
                                        </div>
                                    </div>
                                    {/* */}
                                </div>

                                
                                <div className="flex flex-wrap">
                                    {/* coefficient*/}
                                    <div className="w-full  px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Coefficient :
                                            </label>
                                            <input
                                                value={coefficient}
                                                onChange={(e) => {
                                                    setCoefficient(e.target.value);
                                                }}
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-600`}
                                            />
                                        </div>
                                    </div>
                                    {/* */}
                                </div>

                            </Card>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                saveHandel();
                            }}
                        >
                            save
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document.forms[0].reset()
                                setTitle("")
                                setSeason(1)
                                setBranch("")
                                setKey("")
                                setCoefficient("")
                                setDuration("")
                                setLevel("")
                                setOption(-1)
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

export default CreateModule;
