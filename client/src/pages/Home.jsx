import React from 'react'
import RequestForm from '../components/RequestForm/RequestForm'
import About from '../components/About/About'
import ClassroomResource from '../components/ClassroomResource/ClassroomResource'
import Hero from '../components/Hero/Hero'

export default function Home() {
  return (
    <div>
        <Hero />
        <ClassroomResource />
        <RequestForm />
        <About />
    </div>
  )
}
