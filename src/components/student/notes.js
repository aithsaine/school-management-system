import React from 'react'
import Card from '../card'
import { BiBookmark } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../../tools/loader'

export default function StudentNotes() {
    const { assignements, modules, notes,student } = useSelector(state => state)
   
    const [maxControl, setMaxControl] = useState()

   
    useEffect(() => {
        setMaxControl(
            Math.max(...notes.map(item => item.control))
        )
    }, [notes])
    return (
        (student)?
        <Card title={"mes note du controles"} icon={BiBookmark}>
            <hr className="border-b-1 border-blueGray-300" />
            <h1>-={">"} Mes notes</h1>
            <hr className="border-b-1 border-blueGray-300" />
            <br/>

            <table>
                <thead>
                    <tr>
                        <th className='text-sky-600'>Module</th>
                        {Array.from({ length: maxControl }, (_, i) => i + 1).map(item => <th className='text-xs text-sky-600' key={item}>Control {item}</th>)}
                        <th className='text-sky-600'>Moyen</th>
                    </tr>
                </thead>
                <tbody>
                    {assignements.filter(item => item.group == student.group).map((item, key) => {
                        return <tr  key={key + "kk"}>
                            <td className='text-sm'>{modules.find(elem => elem.id == item.module).title}</td>
                            {Array.from({ length: maxControl }, (_, i) => i + 1).map((elem) =>
                                <td className='text-sm'  key={elem}>{notes && (notes.find(elem1 => elem1.assignement == item.id && elem1.control == elem) ? ("0" + Number(notes.find(elem1 => elem1.assignement == item.id && elem1.control == elem).note).toFixed(2)).slice(-5) : "--")}</td>)}
                            <td>{Number(notes.filter(elem => elem.assignement == item.id).reduce((current, next) => (current + Number(next.note)), 0) / notes.filter(elem => elem.assignement == item.id).length) ? ("0" + Number(notes.filter(elem => elem.assignement == item.id).reduce((current, next) => (current + Number(next.note)), 0) / notes.filter(elem => elem.assignement == item.id).length).toFixed(2)).slice(-5) : ''}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Card>:<Loading/>
    )
}
