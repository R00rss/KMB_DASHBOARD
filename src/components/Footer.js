import React from 'react'
import styles from "./Footer.module.css"
const Footer = () => {
  return (
    <div className={`${styles.container} relative bottom-0 w-full flex justify-center items-center text-slate-200 py-2`}>
      <p>© 2023 KMB. All rights reserved.</p>
    </div>
  )
}

export default Footer