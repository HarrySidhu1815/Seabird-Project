import React, { useState } from 'react'
import classes from './LoginSection.module.css'
import Input from '../../UI/Input'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logInFailure, logInStart, logInSuccess } from '../../redux/user/userSlice'

export default function LoginSection() {
    const [formData, setFormData] = useState({admin: false})
    const {loading, error} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleInputChange(e){
        const { id, type, checked, value } = e.target;
        
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    }

    async function handleFormSubmit(e){
        e.preventDefault()
        try {
            dispatch(logInStart)
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            
            if(data.success === false){
              dispatch(logInFailure(data))
              return
            }

            dispatch(logInSuccess(data))
            navigate('/')
    
        } catch (error) {
            dispatch(logInFailure(error))
        }
    }
  return (
    <div className={classes['login-container']}>
      <h1>Please enter the password to gain access to all resources and materials</h1>
      {error && <span>{error.message || 'Something went wrong'}</span>}
      <form onSubmit={handleFormSubmit}>
      <Input type='email' name='email' title='Email' onChange={handleInputChange}/>
      <Input type='password' name='password' title='Password' onChange={handleInputChange}/>
      <button>{loading ? 'Loading' : 'Submit'}</button>
      </form>
      <p>Forgot the password? Reach out to your school or organization, or request access again.</p>
    </div>
  )
}
