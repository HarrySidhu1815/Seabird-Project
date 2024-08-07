import React from "react";
import classes from './ClassroomResource.module.css'
import ResouceCard from "./ResouceCard";

export default function ClassroomResource() {
  return (
    <div id={classes.resources}>
      <h1>View Classroom Resources</h1>
      <div className={classes.container}>
        <ResouceCard title='Elder Interviews' description='Browse 99 video interviews with Seabird Island Elders'/>
        <ResouceCard title='Curriculum Materials' description='Find full lesson plans and materials ready for classroom use'/>
        <ResouceCard title='Other Resources' description='Find additional information about Sto:lo history and traditions.'/>
      </div>
      <h1>Who can use these educational materials?</h1>
      <p className={classes.paragraph}>
        Body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text
      </p>
    </div>
  );
}
