import React from "react";
import classes from "./CurriculumHeader.module.css";
import { useSelector } from "react-redux";
import AdminBar from "../../UI/AdminBar";

export default function CurriculumHeader() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
    <div className={classes.curriclum}>
      {currentUser && currentUser.admin !== 'no-access' && <AdminBar />}
      <h1>Curriculum Materials</h1>
      <p>
        The majority of the curriculum resources available here were developed
        by UFV Collaboratorium students under the mentorship of Prof. Keith
        Carlson. The students were asked to create new curriculum that would
        highlight the knowledge and wisdom of Seabird Island Elders. To
        accomplish this, the students drew directly from the Elders’ voices that
        appear in the 99 video mini-documentaries. <br />
        <br />
        In addition, Dr. Dawn Marsden (Mississaugas of Scugog Island FN) and
        Seabird Island member Chelsea Forseth have also developed curriculum
        resources that are available here. <br />
        <br />
        More resources will continue to be added as they are developed.
      </p>
    </div>
    <div className={classes.contributors}>
      <p>The UFV Collaboratorium students who contributed to the curriculum
        resources showcased here include Tara-Lynn Kozma-Perrin, Alexis Klassen,
        Noa Brooks, Alex de Boer, Bethany Zimmerman, Chloe Belanger, Aliyah
        Friesen, Zachary Mattie and Gurpreet Kaur Saini.</p>
    </div>
    </>
  );
}
