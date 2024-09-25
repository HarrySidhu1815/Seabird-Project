import React from "react";
import Loading from "../UI/Loading";
import AdminBar from "../UI/AdminBar";
import { useSelector } from "react-redux";
import classes from './pages.module.css'
import BookCard from "../components/BookCard/BookCard";
import { pdfDocument } from "../util/pdfDocument";
import FeedbackTab from "../UI/FeedbackTab";

export default function OtherResource() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className={classes.resources}>
        {currentUser && currentUser.admin !== 'no-access' && <AdminBar />}
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
      <div className={classes['content-resources']}>
        <h2>Websites</h2>
        <div className={classes['website-links']}>
        <a target="_blank" className={classes['website-link']} href="https://www.stoloreconciliation.com">Stó:lō Reconciliation</a>
        <a target="_blank" className={classes['website-link']} href="http://digitalsqewlets.ca/index-eng.php">Digital Sq'éwlets</a>
        <a target="_blank" className={classes['website-link']} href="https://www.srrmcentre.com">Stó:lō Research and Resource Management Centre</a>
        <a target="_blank" className={classes['website-link']} href="https://indigenous.abbyschools.ca">Indigenous Education Centre (Abbotsford School District)</a>
        </div>
        <h2>PDF Documents</h2>
        <div className={classes['pdf-documents']}>
          {
            pdfDocument.map(pdf => (<BookCard key={pdf.id} title={pdf.title} download={pdf.download} image={pdf.image}/>))
          }
        </div>
      </div>
      {currentUser && <FeedbackTab />}
    </div>
  );
}
