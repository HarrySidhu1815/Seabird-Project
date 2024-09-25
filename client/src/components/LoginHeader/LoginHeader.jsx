import React from 'react'
import classes from './LoginHeader.module.css'
import { useSelector } from 'react-redux';
import AdminBar from '../../UI/AdminBar';

export default function LoginHeader() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={classes.login}>
      {currentUser && currentUser.admin !== 'no-access' && <AdminBar />}
      <h1>Log In</h1>
    </div>
  )
}
