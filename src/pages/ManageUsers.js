import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import CreateUser from './CreateUser'
import DeleteUser from './DeleteUser'
import EditUser from './EditUser'
import Footer from '../components/Footer'

const ManageUsers = () => {
  const [createUser, setCreateUser] = useState(true)
  const [updateUser, setUpdateUser] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)

  return (
    <div className='relative min-h-screen' style={{ backgroundColor: "#f2f2f2" }}>
      <Navbar selected="manageUsers" />
      <div className="flex justify-start items-center ml-3 gap-3">
        <button
          className={`${createUser ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
          onClick={() => {
            setUpdateUser(false)
            setCreateUser(true)
            setDeleteUser(false)
          }}
        >
          Crear usuario
        </button>
        <button
          className={`${updateUser ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
          onClick={() => {
            setUpdateUser(true)
            setCreateUser(false)
            setDeleteUser(false)
          }}
        >
          Editar usuario
        </button>

        <button
          className={`${deleteUser ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
          onClick={() => {
            setUpdateUser(false)
            setCreateUser(false)
            setDeleteUser(true)
          }}
        >
          Eliminar usuario
        </button>

      </div>
      {createUser && <CreateUser />}
      {updateUser && <EditUser />}
      {deleteUser && <DeleteUser />}

      <Footer />
    </div>
  )
}

export default ManageUsers