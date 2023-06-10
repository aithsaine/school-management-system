import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Card from "../../card";
import { BiExport } from "react-icons/bi";
import { useSelector } from "react-redux";
import api from "../../../tools/api"

import { FiFile, FiUpload } from 'react-icons/fi';
import { MainBtn } from "../../../tools/customClasses";
import { Toaster } from "react-hot-toast";
import { error_toast, success_toast } from "../../../tools/notifications";

const ExportStudentGrille = () => {
    const { levels, groups, options, branches } = useSelector(state => state)

    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const downloadHandel = (id) => {

        window.location.href = `http://localhost:8000/api/admin/group/grid/${id}/download`
    }
    const ImportHandel = ()=>{

        api.post("api/admin/students/import",{excels:files}).then(res=>{
            success_toast(res.data.message);
        }).catch(error=>{
            error_toast("erreur")
        })

    }

    return <>
        <Card title={"Exporter Grille pour ajouter des stagiaire"} icon={BiExport}>
        <Toaster/>
            <h1>Exporter la grille</h1>
            <hr className="my-6" />

            {levels.map(item => {
                if (groups.filter(elem => options.filter(elem1 => elem1.branch == branches.find(elem2 => elem2.id == item.id).id).map(elem3 => elem3.id).includes(elem.option)).length > 0) {

                    return <fieldset className="flex">
                        <legend>{item.name}</legend>
                        {groups.filter(elem => options.filter(elem1 => elem1.branch == branches.find(elem2 => elem2.id == item.id).id).map(elem3 => elem3.id).includes(elem.option)).map(element => {
                            return <button
                                onClick={e => downloadHandel(element.id)}

                                className="bg-sky-500 hover:bg-sky-300 rounded-md p-2 m-2 w-1/6">
                                <p className="text-white text-sm">{options.find(elem1 => elem1.id == groups.find(elem2 => elem2.id == element.id).option).season + " anneé"}</p>
                                <p className="text-white font-bold"> {branches.find(elem => elem.id == options.find(elem1 => elem1.id == element.option).branch).key + '-' + (options.find(elem => elem.id == element.option).key !== "TC" ? options.find(elem => elem.id == element.option).key + "-" : "") + element.name}</p>
                            </button>
                        })}
                    </fieldset>
                }
            })}
            <hr className="my-6" />

            <h1>Importer les grille</h1>
            <hr className="my-6" />

            <div
                {...getRootProps()}
                className={`p-6 border-2 ${isDragActive ? 'border-blue-500' : 'border-gray-300'
                    } rounded-md flex flex-col items-center justify-center`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Drop your files here</p>
                ) : (
                    <>
                        <FiUpload className="text-4xl mb-4" />
                        <p>Drag and drop</p>

                    </>
                )}
                {files.length > 0 && (
                    <div className="mt-4">
                        <p className="font-bold">Selected files:</p>
                        <ul className="list-disc list-inside">
                            {files.map((file) => (
                                <li key={file.name} className="flex items-center">
                                    <span className="mr-2">
                                        <FiFile className="text-gray-500" />
                                    </span>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button onClick={e=>ImportHandel()} className={MainBtn}>Enregistrer</button>

        </Card>
    </>
}


export default ExportStudentGrille