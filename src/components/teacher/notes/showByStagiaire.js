import React, { useState, useEffect } from 'react'
import Card from '../../card'
import { FcBookmark } from 'react-icons/fc'
import { useSelector } from 'react-redux'

export default function ShowNotesByStagiaire() {
    const { assignements, branches, options, groups, students, notes, modules } = useSelector(state => state)
    const [availableBranches, setAvailableBranches] = useState([])
    const [uniqueGroups, setUniqueGroups] = useState([])
    const [availableOptions, setAvailableOptions] = useState([])
    const [availableGroups, setAvailableGroups] = useState([])
    const [availableStudents, setAvailableStudents] = useState([])
    const [availableNotes, setAvailableNotes] = useState([])
    const [student, setStudet] = useState("")
    const [branch, setBranch] = useState("")
    const [option, setOption] = useState("")
    const [group, setGroup] = useState("")
    const [maxControl, setMaxControl] = useState(1)
    useEffect(() => {
        setUniqueGroups([...new Map(assignements.map(item => [item['group'], item])).values()])
        setAvailableBranches(uniqueGroups)
    }, [assignements])

    // useEffect(() => {
    //     setUniqueAssignements([...new Map(availableNotes.map(item => [item['assignement'], item])).values()])
    // }, [availableNotes])

    useEffect(() => {
        setAvailableBranches([...new Map(uniqueGroups.map(item => item.group).map(item => branches.find(elem => elem.id == options.find(elem1 => elem1.id == groups.find(elem3 => elem3.id == item).option).branch)).map(item => [item, item])).values()])

    }, [uniqueGroups])

    useEffect(() => {
        setMaxControl(
            Math.max(...availableNotes.map(item => item.control))
        )
    }, [availableNotes])
    const changeBranchHandel = (e) => {
        setStudet("")
        setOption("")
        setGroup("")
        setAvailableOptions(
            [...new Map(uniqueGroups.map(item => options.find(elem => elem.id == groups.find(elem1 => elem1.id == item.group).option)).filter(item => item.branch == e.target.value).map(item => [item, item])).values()]
        )
    }
    const changeOptionHandel = (e) => {
        setStudet("")
        setAvailableGroups(uniqueGroups.filter(item => groups.find(elem => (elem.id == item.group && elem.option == e.target.value))).map(item => groups.find(elem => elem.id == item.group)))
    }

    const changeGroupHandel = (e) => {
        setStudet("")
        setAvailableStudents()
        setAvailableStudents(students.filter(item => item.group == e.target.value))

    }


    const changeStudentHandel = (e) => {
        setAvailableNotes(
            notes.filter(item => item.student == e.target.value)
        )

    }

   


    return (
        <Card title={"suiver les note par stagiaire"}
            icon={FcBookmark}>
            <h1>suiver les note par stg</h1>
            <br />
            <form  style={
                { boxShadow: "2px 2px 2px gray" }
            }
                className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-lg text-gray-700 font-bold mb-2">
                            Branch
                        </label>
                        <select
                            value={branch}
                            onChange={e => setBranch(e.target.value)}
                            onClick={changeBranchHandel}
                            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}>
                            <option value="">Selectionner la branch</option>
                            {
                                availableBranches.map((item, index) => {
                                    return <option key={index}
                                        value={
                                            item.id
                                        }>
                                        {
                                            item.name
                                        }</option>
                                })
                            } </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-lg text-gray-700 font-bold mb-2">
                            Option
                        </label>
                        <select
                            value={option}
                            onChange={e => setOption(e.target.value)}
                            onClick={changeOptionHandel}
                            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}>
                            <option value="">Selectionner l'option</option>
                            {
                                availableOptions.map((item, index) => {
                                    return <option key={index}
                                        value={
                                            item.id
                                        }>
                                        {
                                            item.name == "trunc comun" ? `1ere anneé` : `2eme anneé ${item.name}`
                                        }</option>
                                })
                            } </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-lg text-gray-700 font-bold mb-2">
                            Group
                        </label>
                        <select
                            value={group}
                            onChange={e => setGroup(e.target.value)}
                            onClick={changeGroupHandel}
                            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}>
                            <option value="">Selectionner le niveau</option>
                            {availableGroups.map((item, index) => {
                                return <option key={index}
                                    value={
                                        item.id
                                    }>
                                    {
                                        item.name
                                    }</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-lg text-gray-700 font-bold mb-2">
                            Stagiaire
                        </label>
                        <select
                            value={student}
                            onChange={e => setStudet(e.target.value)}
                            onClick={changeStudentHandel}
                            className={`bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-gray-600`}>
                            <option value="" id="first_student_option">Choisie le stagiaire</option>
                            {availableStudents.map((item, index) => {
                                return <option key={index}
                                    value={
                                        item.id
                                    }>
                                    {
                                        item.first_name.toUpperCase() + " " + item.last_name.toUpperCase()
                                    }</option>
                            })}
                        </select>
                    </div>
                </div>
            </form>
            <br />
            <hr className="border-b-1 border-blueGray-300" />
            <br />
            {student && (<table>
                <thead>
                    <tr>
                        <th className='text-sky-600'>Module</th>
                        {Array.from({ length: maxControl }, (_, i) => i + 1).map(item => <th className='text-xs text-sky-600' key={item}>Control {item}</th>)}
                        <th className='text-sky-600'>Moyen</th>
                    </tr>
                </thead>
                <tbody>
                    {assignements.filter(item => item.group == group).map((item, key) => {
                        return <tr>
                            <td key={key + "kk"}>{modules.find(elem => elem.id == item.module).title}</td>
                            {Array.from({ length: maxControl }, (_, i) => i + 1).map((elem) =>
                                <td key={elem}>{availableNotes && (availableNotes.find(elem1 => elem1.assignement == item.id && elem1.control == elem) ?  ("0" + Number(availableNotes.find(elem1 => elem1.assignement == item.id && elem1.control == elem).note).toFixed(2)).slice(-5) : "--")}</td>)}
                            <td>{Number(availableNotes.filter(elem => elem.assignement == item.id).reduce((current, next) => (current + Number(next.note)), 0) / availableNotes.filter(elem => elem.assignement == item.id).length) ? ("0" + Number(availableNotes.filter(elem => elem.assignement == item.id).reduce((current, next) => (current + Number(next.note)), 0) / availableNotes.filter(elem => elem.assignement == item.id).length).toFixed(2)).slice(-5) : ''}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            )}
        </Card>
    )
}
