import React from "react";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.links}>
        <div className={classes['outer-div']}>
          <h2>Links</h2>
          <ul>
            <li>Elder Interviews</li>
            <li>Curriculum Materials</li>
            <li>Other Resources</li>
            <li>Log In</li>
          </ul>
        </div>
        <div className={classes['outer-div']}>
          <div>
            <h2>Request Access</h2>
            <ul>
              <li>Fill out a request form</li>
            </ul>
          </div>
          <div>
            <h2>Terms of Use</h2>
            <ul>
              <li>Read our Terms of Use</li>
            </ul>
          </div>
        </div>
        <div className={classes['outer-div']}>
          <h2>Contacts</h2>
          <p>Footer Information</p>
        </div>
      </div>
      <p className={classes.copyright}>&copy; BMO Collaboratorium 2024</p>
    </footer>
  );
}
