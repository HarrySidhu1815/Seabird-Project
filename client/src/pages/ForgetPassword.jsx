import React, { useState } from 'react'
import classes from './pages.module.css'
import Input from '../UI/Input';
import { useParams } from 'react-router-dom';

export default function ForgetPassword() {
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        'confirm-password': "",
      });
    const { token } = useParams();

      function handleInputChange(e){
        const {name, value} = e.target
    
        setFormData(prevState => 
            ({
            ...prevState,
            [name]: value
        }))
      }

      async function hanldeFormSubmit(e){
        e.preventDefault()

        setLoading(true)
        if(formData.password !== formData['confirm-password']){
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        const password = formData.password

        const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
        })

        const data = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(data.message)
            return
        }
        setLoading(false)
        setError(null)
        setSuccess(true)
      }
  return (
    <div className={classes['forgot-password']}>
      <h2>Welcome to Learning with Seabird!</h2>
      <p>Please set a custom password for your account. </p>
      <form className={classes['forgot-password-form']} onSubmit={hanldeFormSubmit}>
      <label htmlFor="password">Enter Password</label>
          <Input
            id="password"
            value={formData.password}
            type="password"
            name="password"
            title="Password"
            onChange={handleInputChange}
          />
      <label htmlFor="confirm-password">Confirm Password</label>
      <Input
            id="confirm-password"
            value={formData['confirm-password']}
            type="password"
            name="confirm-password"
            title="Confirm password"
            onChange={handleInputChange}
          />
          {success && <p className={classes.success}>Your password has been changed successfully</p>}
          {error && <p className={classes.error}>{error}</p>}
          <button disabled={loading}>{loading ? 'Updating' : 'Log In'}</button>
      </form>
    </div>
  )
}
