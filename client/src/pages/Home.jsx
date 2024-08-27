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
        <h1>Seabird Island Culture, History, and Education</h1>
        <p>
          Welcome to a new educational resource site where you can listen to
          Seabird Island Knowledge Keepers and others as they share aspects of
          the history and culture of the Seabird Island and broader Tiyt tribe
          and Stó:lō Nation communities.<br/><br/> Here you’ll also find curriculum
          resources that have been specifically designed for teachers and
          educators working with and for Seabird Island. This is a dynamic and
          growing new curriculum platform so check in regularly to see what new
          resources have been added.
        </p>
        <AccessButton />
      </div>
      <ClassroomResource />
      <RequestForm />
      <About />
    </div>
  );
}
