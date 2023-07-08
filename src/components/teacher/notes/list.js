import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../card";
import { FcSurvey } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function ListNote() {
    const { notes, levels, branches, options, modules, students, groups, assignements } = useSelector((state) => state);
    const { affectation_id, control_nbr } = useParams();
    const [assignement, setAssignement] = useState()
    useEffect(() => {
        assignements && setAssignement(assignements.find(item => item.id == affectation_id))
    })





    return (assignement&&
        <Card
            title={`les note du controle numero ${control_nbr}`}
            icon={FcSurvey}
        >
            <div className="flex">
                <div className="w-2/3">
                    <p className="text-sm">
                        Niveau :{" "}
                        <span className="text-sky-800">
                            {
                                levels.find((elem3) => elem3.id == branches.find((item) => item.id == options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignement.group).option).branch).level).name
                            }{" "}
                        </span>
                    </p>
                    <p className="text-sm">
                        Filiere :{" "}
                        <span className="text-sky-800">
                            {
                                branches.find((item) => item.id == options.find((elem) => elem.id == groups.find((elem1) => elem1.id == assignement.group).option).branch).name
                            } </span>
                    </p>


                    <p className="text-sm">
                        Controle Numero :{" "}
                        <span className="text-sky-800">{control_nbr} </span>{" "}
                    </p>
                </div>
                <div className="w-1/3">
                    <p className="text-sm">
                        Season :{" "}
                        <span className="text-sky-800">
                            {options.find(
                                (elem) =>
                                    elem.id ==
                                    groups.find(
                                        (elem1) =>
                                            elem1.id ==
                                            assignements.find((elem) => elem.id == affectation_id).group
                                    ).option
                            ).season == 1
                                ? "premiere annee"
                                : "deuxiem anne"}{" "}
                        </span>
                    </p>
                    <p className="text-sm">
                        Module :{" "}
                        <span className="text-sky-800">
                            {modules.find((item) => item.id == assignements.find((elem) => elem.id == affectation_id).module).title}{" "}
                        </span>
                    </p>
                    <p className="text-sm">
                        Group :{" "}
                        <span className="text-sky-800">
                            {branches.find(
                                (item) =>
                                    item.id ==
                                    options.find(
                                        (elem) =>
                                            elem.id ==
                                            groups.find(
                                                (elem1) =>
                                                    elem1.id ==
                                                    assignements.find((elem) => elem.id == assignement.id).group
                                            ).option
                                    ).branch
                            ).key +
                                (options.find(
                                    (elem) =>
                                        elem.id ==
                                        groups.find(
                                            (elem1) =>
                                                elem1.id ==
                                                assignements.find((elem) => elem.id == assignement.id).group
                                        ).option
                                ).key == "TC"
                                    ? ""
                                    : "-" +
                                    options.find(
                                        (elem) =>
                                            elem.id ==
                                            groups.find(
                                                (elem1) =>
                                                    elem1.id ==
                                                    assignements.find((elem) => elem.id == assignement.id).group
                                            ).option
                                    ).key) +
                                ("-" +
                                    groups.find(
                                        (item) =>
                                            item.id ==
                                            assignements.find((elem) => elem.id == assignement.id).group
                                    ).name)}{" "}
                        </span>
                    </p>
                </div>
            </div>
            <br />
            <hr className="m-2" />

            <hr className="m-2" />
            <table className="">
                <thead>
                    <tr>
                        <th>Nom Complete</th>
                        <th>Numero du stagiaire</th>
                        <th>La note</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.filter(item => item.control == control_nbr).filter(item => item.assignement == assignement.id).map
                        ((item, index) => {
                            return <tr key={index}>
                                <td data-label="nom" className="p-1 ">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full"
                                                src={`https://avatars.dicebear.com/v2/initials/${students.find(elem => elem.id == item.student).first_name[0]}-${students.find(elem => elem.id == item.student).last_name[0]}.svg`}
                                            />
                                        </div>
                                        <div className="font-medium text-sm text-gray-800">
                                            {students.find(elem => elem.id == item.student).first_name.toUpperCase() + " " + students.find(elem => elem.id == item.student).last_name.toUpperCase()}
                                        </div>
                                    </div>
                                </td>

                                <td data-label="code stagiaire" className="text-sm">{students.find(elem => elem.id == item.student).student_number}</td>
                                <td data-label="la note" className="text-sm">{("0" + Number(item.note).toFixed(2)).slice(-5)}   /<sub>20</sub> </td>
                            </tr>
                        })}
                </tbody>
            </table>
        </Card>)


                    }