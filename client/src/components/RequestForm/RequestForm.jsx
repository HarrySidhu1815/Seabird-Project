import React from "react";
import classes from './RequestForm.module.css'

export default function RequestForm() {
  return (
    <section id={classes['request-access']}>
      <div className={classes.header}>
        <h1>Request Full Access</h1>
        <p>
          Body text body text body text body text body text body text body text
          body text body text body text body text body text body text body text
          body text.
        </p>
      </div>
      <form className={classes['request-form']}>
        <div className={classes.name}>
            <input className={classes['name-input']} type='text' name='first-name' placeholder='First Name' required/>
            <input className={classes['name-input']} type='text' name='last-name' placeholder='Last Name' required/>
        </div>
        <input className={classes.input} type='text' name='school' placeholder='School, organization, group, or community affilation' required/>
        <input className={classes.input} type='email' name='email' placeholder='Email' required/>
        <textarea className={classes.textarea} rows={30} type='text' name='reason' placeholder='Reason for request'></textarea>
        <button className={classes['submit-btn']}>Submit Request</button>
      </form>
    </section>
  );
}
