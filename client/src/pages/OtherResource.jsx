import React from "react";
import Loading from "../UI/Loading";
import AdminBar from "../UI/AdminBar";
import { useSelector } from "react-redux";
import classes from './pages.module.css'

export default function OtherResource() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className={classes.resources}>
        {currentUser?.admin && <AdminBar />}
        <h1>Other Resources</h1>
        <p>
          There is a growing body of historical and cultural research resources
          relating to the Stó:lō community, and much of this is being connected
          to curriculum and pedagogical resources for Indigenous educators. In
          this section we are providing links to materials that we hope Sq’éwqel
          members and educators will find useful as they work to contribute to
          the resurgence of Seabird cultural and political knowledge and
          practice. Additionally included here are some resources that were
          developed specifically for, or by, the Sq’éwqel community and it’s
          allies.
        </p>
      </div>
      
    </div>
  );
}
