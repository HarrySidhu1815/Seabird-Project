import React from "react";
import classes from "./ClassroomResource.module.css";
import ResouceCard from "./ResouceCard";
import ElderInterview from "../../assets/home2.jpg";
import curriculum from "../../assets/home3.jpg";
import otherResource from "../../assets/home4.jpg";

export default function ClassroomResource() {
  return (
    <div id={classes.resources}>
      <h1>View Classroom Resources</h1>
      <div className={classes.container}>
        <ResouceCard
          title="Elder Interviews"
          description="Browse 99 video interviews with Seabird Island Elders"
          image={ElderInterview}
          link="interviews"
        />
        <ResouceCard
          title="Curriculum Materials"
          description="Find full lesson plans and materials ready for classroom use"
          image={curriculum}
          link="curriculum"
        />
        <ResouceCard
          title="Other Resources"
          description="Find additional information about Stó:lo history and traditions"
          image={otherResource}
          link="resources"
        />
      </div>
      <h1>Who can use these educational materials?</h1>
      <p className={classes.paragraph}>
        This website is intended first and foremost for Sq’éwqel / Seabird
        Island band and community members. It is also designed to assist K-12
        and college educators who are working with and for the Seabird
        community. We have made some of the videos and curriculum resources
        publicly accessible, but to access most of them you will need first to
        secure permissions. These restrictions are in place because the Elders
        and other Knowledge Keepers who contributed their time, energy, and
        knowledge to this project did it with the understanding that they were
        helping build resources specifically for Seabird members, youth, and
        educators.
      </p>
    </div>
  );
}
