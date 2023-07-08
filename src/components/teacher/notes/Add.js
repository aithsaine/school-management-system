import React from "react";
import Card from "../../card";
import {useParams} from "react-router-dom";
import {FcBookmark} from "react-icons/fc";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useState} from "react";
import {MainBtn} from "../../../tools/customClasses";
import api from "../../../tools/api";
import {success_toast, error_toast} from "../../../tools/notifications";
import {Toaster} from "react-hot-toast";
import swal from "sweetalert";

export default function Add() {
    const {id} = useParams();
    const {
        assignements,
        levels,
        branches,
        options,
        groups,
        modules,
        students
    } = useSelector((state) => state);
    const [assignement, setAssignement] = useState();
    const [notes, setNotes] = useState(students.filter((item) => item.group == assignements.find((elem) => elem.id == id).group).map((elem) => [
        elem.student_number,
        (note) => null
    ]));
    useEffect(() => {
        setAssignement(assignements.find((item) => item.id == Number(id)));
        assignement && setNotes(students.filter((item) => item.group == assignement.group).map((elem) => [
            elem.student_number,
            (note) => null
        ]));
    }, [assignements]);

    const AddHandel = () => {
        swal({
            title: "Vous etes sure?",
            text: `Verifier les note pour l'acceptation final du controle Numero ${
                assignement.notes[assignement.notes.length - 1] + 1 ? assignement.notes[assignement.notes.length - 1] + 1 : 1
            }`,
            icon: "warning",
            buttons: true,
            warningmode: true
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const res = await api.post("/api/teacher/note/store", {
                        notes: notes,
                        assignement: assignement.id,
                        control_number: assignement.notes[assignement.notes.length - 1] + 1 ? assignement.notes[assignement.notes.length - 1] + 1 : 1
                    });
                    success_toast(res.data.message);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);
                } catch (error) {
                    error_toast(error.response.data.message);
                }
            }
        });
    };

    return(assignement && (
        <Card title="Inserer les note du controlle"
            icon={FcBookmark}>
            <Toaster/>
            <div className="flex">
                <div className="w-2/3">
                    <p className="text-sm">
                        Niveau :{" "}
                        <span className="text-sky-800">
                            {
                            levels.find((elem3) => elem3.id == branches.find((item) => item.id == options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).branch).level).name
                        } </span>
                    </p>
                    <p className="text-sm">
                        Filiere :{" "}
                        <span className="text-sky-800">
                            {
                            branches.find((item) => item.id == options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).branch).name
                        } </span>
                    </p>
                    <p className="text-sm">
                        Option :{" "}
                        <span className="text-sky-800">
                            {
                            options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).name
                        } </span>
                        {" "} </p>
                    <p className="text-sm">
                        Controle Numero :{" "}
                        <span className="text-sky-800">
                            {
                            assignement.notes[assignement.notes.length - 1] + 1 ? assignement.notes[assignement.notes.length - 1] + 1 : 1
                        } </span>
                        {" "} </p>
                </div>
                <div className="w-1/3">
                    <p className="text-sm">
                        Season :{" "}
                        <span className="text-sky-800">
                            {
                            options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).season == 1 ? "premiere annee" : "deuxiem anne"
                        } </span>
                    </p>
                    <p className="text-sm">
                        Module :{" "}
                        <span className="text-sky-800">
                            {
                            modules.find((item) => item.id == assignement.module).title
                        } </span>
                    </p>
                    <p className="text-sm">
                        Group :{" "}
                        <span className="text-sky-800">
                            {
                            branches.find((item) => item.id == options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).branch).key + (options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).key == "TC" ? "" : "-" + options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignements.find((elem) => elem.id == id).group).option).key) + ("-" + groups.find((item) => item.id == assignements.find((elem) => elem.id == id).group).name)
                        } </span>
                    </p>
                </div>
            </div>
            <br/>
            <hr className="m-2"/>
            <h1></h1>
            <hr className="m-2"/>
            <table className="">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Numero de stagiaire</th>
                        <th>Nom Complete</th>
                        <th>La note</th>
                    </tr>
                </thead>
                <tbody> {
                    students.filter((item) => item.group == assignement.group).map((item, index) => {
                        return (
                            <tr className="bg-gray-300"
                                key={index}>
                                <td className="text-sm">
                                    {
                                    index + 1
                                }</td>
                                <td className="text-sm">
                                    {
                                    item.student_number
                                }</td>
                                <td className="text-sm">
                                    {
                                    item.first_name.toUpperCase()
                                }
                                    {" "}
                                    {
                                    item.last_name.toUpperCase()
                                } </td>
                                <td className="text-sm">
                                    <input className="bg-white border-2 border-sky-800 p-1 text-center"
                                        onChange={
                                            (e) => {
                                                setNotes(notes.map((elem) => elem[0] == item.student_number ? [elem[0], e.target.value] : [
                                                    elem[0], elem[1]
                                                ]));
                                            }
                                        }
                                        style={
                                            {
                                                width: "80px",
                                                borderRadius: "10px"
                                            }
                                        }
                                        min={0}
                                        max={20}
                                        type="number"/>
                                </td>
                        </tr>
                        );
                    })
                } </tbody>
            </table>
            <button onClick={
                    (e) => AddHandel()
                }
                className={MainBtn}>
                Enregister
            </button>
        </Card>
    ));
}
