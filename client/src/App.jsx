import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Interviews from './pages/Interviews'
import Curriculum from './pages/Curriculum'
import Login from './pages/Login'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/interviews' element={<Interviews />} />
        <Route path='/curriculum' element={<Curriculum />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
