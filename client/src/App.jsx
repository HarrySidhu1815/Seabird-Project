import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Interviews from './pages/Interviews'
import Curriculum from './pages/Curriculum'
import Login from './pages/Login'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SignUp from './pages/SignUp'
import OtherResource from './pages/OtherResource'
import Admin from './pages/Admin'
import AdminRoute from './pages/AdminRoute'
import ScrollToTop from './components/Header/ScrollToTop'
import TermsOfUse from './pages/TermsOfUse'
import RequestAccessPage from './pages/RequestAccess'

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/interviews' element={<Interviews />} />
        <Route path='/curriculum' element={<Curriculum />} />
        <Route path='/resources' element={<OtherResource />} />
        <Route path='/login' element={<Login />} />
        <Route path='/termsofuse' element={<TermsOfUse />} />
        <Route path='/request-access' element={<RequestAccessPage />} />
        <Route
          path='/admin'
          element={<AdminRoute element={<Admin />} />} 
        />
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
