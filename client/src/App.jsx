import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Interviews from './pages/Interviews'
import Curriculum from './pages/Curriculum'
import Login from './pages/Login'
import Header from './components/Header/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/interviews' element={<Interviews />} />
        <Route path='/curriculum' element={<Curriculum />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
