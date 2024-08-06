import React, { useState } from 'react'
import classes from './LoginSection.module.css'
import Input from '../../UI/Input'
import { useNavigate } from 'react-router-dom'

export default function LoginSection() {
    const [formData, setFormData] = useState({admin: false})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
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
        setLoading(true)
        setError(false)
        try {
            setLoading(true)
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            console.log(data)
            setLoading(false)

            if(data.success === false){
                setError(true)
            } else{
              navigate('/')
            }
        } catch (error) {
            setLoading(false)
            setError(true)
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
