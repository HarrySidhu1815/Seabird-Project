import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import ufvLogo from "../../assets/footer1.svg";
import seabirdLogo from "../../assets/footer2.svg";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.links}>
        <div className={classes["outer-div"]}>
          <h2>Links</h2>
          <ul>
            <li>
              <Link to="/interviews">Elder Interviews</Link>
            </li>
            <li>
              <Link to="/curriculum">Curriculum Materials</Link>
            </li>
            <li>
              <Link to="/resources">Other Resources</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </div>
        <div className={classes["outer-div"]}>
          <div>
            <h2>Request Access</h2>
            <ul>
              <li>Fill out a request form</li>
            </ul>
          </div>
          <div>
            <h2>Terms of Use</h2>
            <ul>
              <li><Link to="/termsofuse">Read our Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className={classes["outer-div"]}>
          <div className={classes.contact}>
          <div>
            <h2>Contact</h2>
            <ul>
              <h3 className={classes.bmo}>The BMO Collaboratorium</h3>
              <li>PARCCollab@ufv.ca</li>
              <h3 className={classes.seabird}>
                Seabird Island Community School
              </h3>
              <li>Email@example.com</li>
            </ul>
          </div>
          <div className={`${classes.logos}`}>
            <img src={ufvLogo} alt="UFV Logo" />
            <img src={seabirdLogo} alt="Seabird Logo" />
          </div>
          </div>
        </div>
      </div>
      <p className={classes.copyright}>&copy; BMO Collaboratorium 2024</p>
    </footer>
  );
}
