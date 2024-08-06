import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({admin: false})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

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
            const res = await fetch('/api/auth/signup', {
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
            }
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleFormSubmit}>
        <input type='text' placeholder='username' id='username' required onChange={handleInputChange}/>
        <input type='email' placeholder='email' id='email' required onChange={handleInputChange}/>
        <input type='password' placeholder='password' id='password' required onChange={handleInputChange}/>
        <input type='checkbox' name='admin' id='admin' value='true' onChange={handleInputChange}/>
        <label htmlFor='admin'>Admin</label>
        <button>Sign Up</button>
      </form>
      <div>
        <p>Have an account</p>
        <Link to='/login'>
        <span>Login In</span>
        </Link>
      </div>
      {error && <p>{error.message || 'Something went wrong'}</p>}
    </div>
  )
}

export default SignUp
