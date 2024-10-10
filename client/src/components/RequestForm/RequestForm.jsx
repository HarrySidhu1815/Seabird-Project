import React, { useState } from "react";
import classes from "./RequestForm.module.css";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    school: '',
    email: '',
    reason: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()

  function handleInputChange(e){
    const {name, value} = e.target

    setFormData(formData => ({...formData, [name]: value}))
  }

  async function handleFormSubmit(e){
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch('/api/auth/request-access', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      setMessage(data.message)
      setLoading(false)

    } catch (error) {
      setMessage(error)
      setLoading(false)
    }

    setFormData({
      firstName: '',
      lastName: '',
      school: '',
      email: '',
      reason: ''
    })
  }

  return (
    <section id={classes["request-access"]}>
      <div className={classes.header}>
        <h1>Request Full Access</h1>
        <p>
          If you are a Seabird Island band member or community member, or if you
          are an educator working at one of the Seabird Island schools or the
          Seabird Island College, you are entitled to access all the information
          on this website. Please email the Seabird Administrator and request
          the password.<br/><br/> If you are not a member of the Seabird community or
          affiliated with the Seabird schools and college, you might still be
          able to get permission to access the resources. Please email the
          administrator and provide them with a short letter explaining why you
          would like to access the videos and curriculum resources.
        </p>
      </div>
      <form className={classes["request-form"]} onSubmit={handleFormSubmit}>
        <div className={classes.name}>
          <input
            className={classes["name-input"]}
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            className={classes["name-input"]}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={formData.lastName}
            required
          />
        </div>
        <input
          className={classes.input}
          type="text"
          name="school"
          onChange={handleInputChange}
          value={formData.school}
          placeholder="School, organization, group, or community affilation"
          required
        />
        <input
          className={classes.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          className={classes.textarea}
          rows={30}
          type="text"
          name="reason"
          onChange={handleInputChange}
          value={formData.reason}
          placeholder="Reason for request"
        ></textarea>

        {message && <p className={classes['success-msg']}>{message}</p>}
        <button className={classes["submit-btn"]} disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</button>
      </form>
    </section>
  );
}
