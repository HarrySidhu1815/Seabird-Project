import React, { useState } from "react";
import classes from './AddUser.module.css'

export default function AddUser() {
  const [formData, setFormData] = useState({admin: false})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleInputChange(e){
        const { id, value } = e.target;
        
        setFormData({
            ...formData,
            [id]: value
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

            setLoading(false)

            if(data.success === false){
                setError(true)
            }
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

  return (
    <div className={classes['add-user']}>
      <h3>Add New User</h3>
      <form onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Email" id="email" required onChange={handleInputChange}/>
        <input type="password" placeholder="Password" id="password" required onChange={handleInputChange}/>
        <p>
          Enter any password. The new user will be prompted to set a custom
          password the first time they log in.{" "}
        </p>
        {success && <p>User Created Successfully</p>}
        {error && <p>{error.message || 'Something went wrong'}</p>}
        <button>{loading ? 'Adding...' : 'Add New User'}</button>
      </form>
    </div>
  );
}
