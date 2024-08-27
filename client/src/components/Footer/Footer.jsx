import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.links}>
        <div className={classes['outer-div']}>
          <h2>Links</h2>
          <ul>
            <li><Link to='/interviews'>Elder Interviews</Link></li>
            <li><Link to='/curriculum'>Curriculum Materials</Link></li>
            <li><Link to='/resources'>Other Resources</Link></li>
            <li><Link to='/login'>Log In</Link></li>
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
