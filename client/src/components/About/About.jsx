import React from "react";
import AboutCard from "./AboutCard";
import classes from './About.module.css'

export default function About() {
  return (
    <div id={classes['about-section']}>
      <AboutCard
        title="About the BMO Collaboratorium"
        a="https://www.bmo.com/main/personal/credit-cards/bmo-ascend-world-elite-mastercard/"
        websiteTitle="BMO Collaboratorium Website"
      >
        Body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text
      </AboutCard>
      <AboutCard
        title="Working with Seabird Island"
        a="https://www.bmo.com/main/personal/credit-cards/bmo-ascend-world-elite-mastercard/"
        websiteTitle="Seabird Island Band Official Website"
      >
        Body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text body text body text body text body text body text body text
        body text
      </AboutCard>
    </div>
  );
}
