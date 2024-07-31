import React from 'react'
import RequestForm from '../components/RequestForm/RequestForm'
import About from '../components/About/About'
import ClassroomResource from '../components/ClassroomResource/ClassroomResource'

export default function Home() {
  return (
    <div>
        <ClassroomResource />
        <RequestForm />
        <About />
    </div>
  )
}
