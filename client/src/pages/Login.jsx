import React from 'react'
import LoginHeader from '../components/LoginHeader/LoginHeader'
import RequestForm from '../components/RequestForm/RequestForm'
import LoginSection from '../components/LoginSection/LoginSection'

export default function Login() {
  return (
    <div>
      <LoginHeader />
      <LoginSection />
      <RequestForm />
    </div>
  )
}
