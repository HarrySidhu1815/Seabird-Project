import React, { useEffect, useState } from "react";
import classes from "./ManageCurriculum.module.css";
import Loading from "../../UI/Loading";
import { useSelector } from "react-redux";
import Table from "../EditingTable/Table";
import UploadLesson from "./UploadLesson";

export default function ManageCurriculum() {
  const { currentUser } = useSelector((state) => state.user);

  const [curriculum, setCurriculum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [showAll, setShowAll] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false)

  async function fetchCurriclum() {
    setIsLoading(true);
    const response = await fetch("/api/resources", {
      method: "POST",
      body: JSON.stringify({
        user: currentUser,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
      return;
    }

    setCurriculum(data.resource);
    setIsLoading(false);
  }


  useEffect(() => {
    fetchCurriclum();
  }, [currentUser]);

  function handleErrorClose() {
    setError(null);
  }

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = (
      <>
        {error && <ErrorBlock message={error} handleClose={handleErrorClose} />}
        <p>Error Occurred</p>
      </>
    );
  }

  if (curriculum.length >0) {
    content = (
      <Table
        data={curriculum.map(({resource_link, updatedAt, ...rest}) => rest)}
        headers={["Lesson Title", "Subject", "Grade Level", "Description", "Visibility"]}
        isInterview={false}
        showAll={showAll}
      />
    );
  }

  function handleUploadVideo(){
    setShowUploadModal(true)
  }

  function closeModalHandler(){
    setShowUploadModal(false)
  }

  return (
    <div className={classes.manage}>
      <div className={classes["curriculum-manage-head"]}>
        <h3>Manage Curriculum</h3>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </button>
        <button onClick={handleUploadVideo}>Upload New Curriculum</button>
        {showUploadModal && <UploadLesson handleCloseModal={closeModalHandler} refreshCurriculum={fetchCurriclum}/>}
      </div>
      {content}
    </div>
  );
}
