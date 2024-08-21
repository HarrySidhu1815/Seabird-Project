import React from "react";
import RequestForm from "../components/RequestForm/RequestForm";
import About from "../components/About/About";
import ClassroomResource from "../components/ClassroomResource/ClassroomResource";
import AccessButton from "../UI/AccessButton";
import classes from "./pages.module.css";

export default function Home() {
  return (
    <div>
      <div id={classes.hero}>
      <h1>Your education, your histoy.</h1>
      <p>This website is a collection of educational resources gathered on behalf of Seabird
      Island Band.</p>
      <AccessButton />
    </div>
      <ClassroomResource />
      <RequestForm />
      <About />
    </div>
  );
}
