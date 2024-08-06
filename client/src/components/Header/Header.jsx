import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector((state) => state.user)

  const bgColor = currentUser ? classes.loggedInAccount : classes.notLoggedInAccount
  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'>Seabird Curriculum Resources</Link></div>
      <nav className={classes.nav}>
        <ul>
            <Link to='/interviews'><li>Elder Interviews</li></Link>
            <Link to='/curriculum'><li>Curriculum Materials</li></Link>
            <Link to='/resources'><li>Other Resources</li></Link>
            <Link to='/login'><li className={`${classes['login-btn']} ${bgColor}`}>{currentUser ? 'Log Out' : 'Log In'}</li></Link>  
        </ul>
      </nav>
    </header>
  )
}
