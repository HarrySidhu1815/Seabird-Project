import React, { useEffect, useState } from "react";
import classes from "./ManageInterviews.module.css";
import Loading from "../../UI/Loading";
import { useSelector } from "react-redux";
import UploadVideo from "./UploadVideo";
import Table from "../EditingTable/Table";

export default function ManageInterviews() {
  const { currentUser } = useSelector((state) => state.user);

  const [videos, setVideos] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [showAll, setShowAll] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false)
  
  // fetching videos

  useEffect(() => {
    async function fetchVideo() {
      setIsLoading(true);
      const response = await fetch("/api/videos", {
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

      setVideos(data.videos);
      setIsLoading(false);
    }

    fetchVideo();
  }, [currentUser]);

  // handle Close Error

  function handleErrorClose() {
    setError(null);
  }


  // Upload function

  function handleUploadVideo(){
    setShowUploadModal(true)
  }

  function closeModalHandler(){
    setShowUploadModal(false)
  }
  // content

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

  if (videos) {
    content = (
      <Table
        data={videos.map(({id, videoUrl, updatedAt, ...rest}) => rest)}
        headers={["Title", "Theme", "Speakers", "Visibility"]}
        isInterview = {true}
        showAll={showAll}
      />
    );
  }

  return (
    <div className={classes.manage}>
      <div className={classes["interviews-manage-head"]}>
        <h3>Manage Interviews</h3>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </button>
        <button onClick={handleUploadVideo}>Upload New Video</button>
      </div>
      {showUploadModal && <UploadVideo handleCloseModal={closeModalHandler}/>}
      {content}
    </div>
  );
}
