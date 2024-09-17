import React from "react";
import classes from "./pages.module.css";

export default function TermsOfUse() {
  return (
    <>
      <div className={classes.terms}>
        <h1>Terms of Use</h1>
      </div>
      <div className={classes["terms-content"]}>
        <p>
          The materials on this website are intended for private and educational
          use only. They may not be reproduced or redistributed for other
          purposes. <br />
          <br />
          Full access to the website and all its materials will only be granted
          to those who meet our qualifying criteria. We ask that these materials
          not be shared or distributed to anyone else without the explicit
          permission of the Sq’éwqel / Seabird Island leadership or their
          designate.
        </p>
        <h2>Elder Interviews Sharing Protocol</h2>

        <p>
          All of the Elders and Knowledge Keepers featured in these videos and
          curriculum resources have consented to sharing their images, voices,
          and stories for this project. However, we ask that you do not take
          advantage of their generosity. They shared with the understanding that
          they were contributing to the well-being and cultural revival of their
          community, and in particular to the youth of their community. <br />
          <br /> Please give thanks to these Elders, and if you want to use
          their videos for other purposes we request that you first secure
          permission from the appropriate authorities at Sq’éwqel/Seabird
          Island. <br />
          <br />
          Also, please be conscientious about cultural protocols. If an Elder
          featured in one of these videos subsequently passes away, please do
          not show or broadcast the video to students or any other audience
          until at least one year has passed.   
        </p>
      </div>
    </>
  );
}
