import React from 'react'
import RequestForm from '../components/RequestForm/RequestForm'
import classes from './pages.module.css'

export default function RequestAccessPage() {
  return (
    <>
      <div className={classes.access}>
        <h1>Request Access</h1>
      </div>
      <RequestForm />
    </>
  )
}
