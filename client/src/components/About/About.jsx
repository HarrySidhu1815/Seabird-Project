import React from "react";
import AboutCard from "./AboutCard";
import classes from "./About.module.css";
import bmoCollaboratorium from "../../assets/home5.jpg";
import seaBird from "../../assets/home6.jpg";

export default function About() {
  return (
    <div id={classes["about-section"]}>
      <AboutCard
        imageSrc={bmoCollaboratorium}
        links={[
          {
            websiteTitle: "BMO Collaboratorium Website",
            link: "https://www.ufv.ca/peace-and-reconciliation/collaboratorium/",
          },
        ]}
        title="About the UFVs' BMO Collaboratorium"
      >
        This website was created through a partnership between the Seabird
        Island Band and the University of the Fraser Valley’s BMO
        Collaboratorium. The BMO Collaboratorium brings highly motivated
        university students to work under faculty mentorship on projects that
        communities have identified as priorities. For more information on how
        you can get involved with the UFV BMO Colaboratorium, please go to
      </AboutCard>
      <AboutCard
        imageSrc={seaBird}
        links={[
          {
            websiteTitle: "Seabird Island Band Official Website",
            link: "https://www.seabirdisland.ca/",
          },
          {
            websiteTitle: "Seabird Island Community School Website",
            link: "https://www.seabirdschool.ca/",
          },
        ]}
        title="Working with Seabird Island"
      >
        The Sq’éwqel community (also know as Seabird Island Band) is a member of
        the Tiyt Tribe and the broader Stó:lō Nation. They are an ancient
        community who was decimated by the 1782 smallpox epidemic and then
        repopulated in the late nineteenth century with Upper Stó:lō and Lower
        Nlakapamux people who were being disrupted and displaced from their
        canyon homes by the construction of the Cariboo Wagon Rd and the
        Canadian Pacific Railway. <br />
        <br />
        Seabird was initially a commonage reserve for the seven Tiyt tribe
        communities. On several occasions settlers from Agassiz and elsewhere
        tried to occupy Seabird and have it removed from the list of Indian
        Reserves. These threats were thwarted by independent actions taken by
        the Tiyt tribe and the Cheam Fist Nation to protect and preserve Seabird
        as a reserve. In 1960 Seabird Island became an independent band (First
        Nation) under the Indian Act. <br /> <br />
        Today Seabird works with other Tiyt tribe members and the broader Stó:lō
        Nation to protect its rights and title and to work towards creating a
        brighter future for their youth.
      </AboutCard>
    </div>
  );
}
