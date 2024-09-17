import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './AdminBar.module.css'

export default function AdminBar() {
    const navigate = useNavigate()

    function handleClick(){
        navigate('/admin')
    }
  return (
    <div onClick={handleClick} className={classes["admin-notification"]}>
          <h2>
            You are logged in as an Administrator. Click here to add or remove
            content, materials, and users.
          </h2>
    </div>
  )
}
