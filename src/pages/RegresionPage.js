import React, { useEffect } from 'react'
import Regresion from '../components/Regresion'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

import FailPage from './FailPage'
const RegresionPage = () => {
  const validate = sessionStorage.getItem("Validate")
  const status = parseInt(sessionStorage.getItem("Status"))
  var client = sessionStorage.getItem("Client")
  if (client === "") {
    client = null
  }
  console.log(status)
  useEffect(() => {
    document.getElementById("title__page").innerHTML = "KMB | Regresion"
  }, [])

  return (
    <>
      {validate === 'true' ?
        <div className='min-h-screen bg-slate-800' style={{ backgroundColor: "#f2f2f2" }}>
          <Navbar selected={"RegresionPage"} />
          <div className="flex justify-start items-center ml-3 gap-3">

            <button className={`outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
            >
              Regresion lineal
            </button>
          </div>
          <Regresion client={client} />
          {/* <Footer /> */}

        </div>
        :
        <FailPage />
      }
    </>
  )
}

export default RegresionPage