import React from "react";
import classes from "./RequestForm.module.css";

export default function RequestForm() {
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
      <form className={classes["request-form"]}>
        <div className={classes.name}>
          <input
            className={classes["name-input"]}
            type="text"
            name="first-name"
            placeholder="First Name"
            required
          />
          <input
            className={classes["name-input"]}
            type="text"
            name="last-name"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          className={classes.input}
          type="text"
          name="school"
          placeholder="School, organization, group, or community affilation"
          required
        />
        <input
          className={classes.input}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <textarea
          className={classes.textarea}
          rows={30}
          type="text"
          name="reason"
          placeholder="Reason for request"
        ></textarea>
        <button className={classes["submit-btn"]}>Submit Request</button>
      </form>
    </section>
  );
}
