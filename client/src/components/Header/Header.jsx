import React, { useState } from 'react'
import classes from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../redux/user/userSlice'
import menu from '../../assets/burgerMenu.png'
import Modal from '../../UI/Modal'
import CancelButton from '../Icons/cancel'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLogout() {
    setShowModal(false)
    await fetch('/api/auth/signout')
      dispatch(signout())
  }

  function handleCancel(){
    setShowModal(false)
    navigate("../");
  }

  function handleButtonClick(){
    setShowMenu(false)
    if(currentUser){
      setShowModal(true)
    } else {
      navigate('/login')
    }
  }

  const bgColor = currentUser ? classes.loggedInAccount : classes.notLoggedInAccount
  return (
    <header className={classes.header}>
      {showModal && (
        <Modal className={classes['logout-modal']}>
        <h2>Are you sure you want to log out?</h2>
        <p>You will have to log in again to have full access to all the materials on this website.</p>
        <div className={classes.controls}>
          <button className={`${classes['loggedInAccount']}`} onClick={handleLogout}>Logout</button>
          <button className={classes.stayLoggedIn} onClick={handleCancel}>Stay Logged In</button>
        </div>
      </Modal>)}
      <div className={classes.logo}><Link to='/'>Learning with Seabird</Link></div>
      <nav className={classes.nav}>
        <ul className={classes.desktopMenu}>
            <Link to='/interviews'><li>Elder Interviews</li></Link>
            <Link to='/curriculum'><li>Curriculum Materials</li></Link>
            <Link to='/resources'><li>Other Resources</li></Link>
            <button className={`${classes['login-btn']} ${bgColor}`} onClick={handleButtonClick}>{currentUser ? 'Log Out' : 'Log In'}</button>
        </ul>
        <img className={classes.mobMenu} src={menu} alt='Menu' onClick={()=>setShowMenu(!showMenu)}/>
        <div className={classes.navMenu} style={{'display': showMenu ? 'flex' : 'none'}}>
            <div onClick={()=>setShowMenu(false)} className={classes['cancel-btn']}><CancelButton /></div>
            <Link to='/' onClick={()=>setShowMenu(false)}><li >Home</li></Link>
            <Link to='/interviews' onClick={()=>setShowMenu(false)}><li >Elder Interviews</li></Link>
            <Link to='/curriculum' onClick={()=>setShowMenu(false)}><li>Curriculum Materials</li></Link>
            <Link to='/resources' onClick={()=>setShowMenu(false)}><li>Other Resources</li></Link>
            <button className={`${classes['login-btn-mobile']} ${bgColor}`} onClick={handleButtonClick}>{currentUser ? 'Log Out' : 'Log In'}</button>
        </div>
      </nav>
    </header>
  )
}
