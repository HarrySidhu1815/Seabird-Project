import React, { useState } from 'react'
import classes from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../redux/user/userSlice'
import menu from '../../assets/burgerMenu.png'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleButtonClick(){
    setShowMenu(false)
    if(currentUser){
      await fetch('/api/auth/signout')
      dispatch(signout())
    } else {
      navigate('/login')
    }
  }

  const bgColor = currentUser ? classes.loggedInAccount : classes.notLoggedInAccount
  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'>Seabird Curriculum Resources</Link></div>
      <nav className={classes.nav}>
        <ul className={classes.desktopMenu}>
            <Link to='/interviews'><li>Elder Interviews</li></Link>
            <Link to='/curriculum'><li>Curriculum Materials</li></Link>
            <Link to='/resources'><li>Other Resources</li></Link>
            <button className={`${classes['login-btn']} ${bgColor}`} onClick={handleButtonClick}>{currentUser ? 'Log Out' : 'Log In'}</button>
        </ul>
        <img className={classes.mobMenu} src={menu} alt='Menu' onClick={()=>setShowMenu(!showMenu)}/>
        <div className={classes.navMenu} style={{'display': showMenu ? 'flex' : 'none'}}>
            <Link to='/interviews' onClick={()=>setShowMenu(false)}><li >Elder Interviews</li></Link>
            <Link to='/curriculum' onClick={()=>setShowMenu(false)}><li>Curriculum Materials</li></Link>
            <Link to='/resources' onClick={()=>setShowMenu(false)}><li>Other Resources</li></Link>
            <button className={`${bgColor}`} onClick={handleButtonClick}>{currentUser ? 'Log Out' : 'Log In'}</button>
        </div>
      </nav>
    </header>
  )
}
