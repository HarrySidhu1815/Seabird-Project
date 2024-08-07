import React from 'react'
import classes from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../redux/user/userSlice'

export default function Header() {
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleButtonClick(){
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
        <ul>
            <Link to='/interviews'><li>Elder Interviews</li></Link>
            <Link to='/curriculum'><li>Curriculum Materials</li></Link>
            <Link to='/resources'><li>Other Resources</li></Link>
            <button className={`${classes['login-btn']} ${bgColor}`} onClick={handleButtonClick}>{currentUser ? 'Log Out' : 'Log In'}</button>
        </ul>
      </nav>
    </header>
  )
}
