import React from 'react'
import { Toaster } from 'react-hot-toast'
import Card from '../../card'
import { AiOutlineUserAdd } from 'react-icons/ai'

export default function AssignTeacher() {
  return (
    <>
        <Card title={"affecter un formateur"} icon={AiOutlineUserAdd}>
      <Toaster />
      </Card>

    </>
  )
}
