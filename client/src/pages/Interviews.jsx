import React, { useEffect, useState } from "react";
import RequestForm from "../components/RequestForm/RequestForm";
import VideoNav from "../components/VideoNav/VideoNav";
import { getVideosBySpeakers, getVideosByTopics } from "../util/video";
import BrowseVideo from "../components/BrowseVideo/BrowseVideo";
import classes from "./pages.module.css";
import { useSelector } from "react-redux";
import AccessButton from "../UI/AccessButton";
import CancelButton from "../components/Icons/cancel";
import ErrorBlock from "../UI/ErrorBlock";

export default function Interviews() {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetch("/api/videos/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          console.log(data.message);
        });
      })
      .then((data) => {
        setVideos(data.videos);
        setSelectedVideos(data.videos);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleFilterTopicChange(topic) {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    setSelectedTopics(updatedTopics);
    filterVideos(updatedTopics, selectedSpeakers);
  }

  function handleFilterSpeakerChange(speaker) {
    const updatedSpeakers = selectedSpeakers.includes(speaker)
      ? selectedSpeakers.filter((s) => s !== speaker)
      : [...selectedSpeakers, speaker];
    setSelectedSpeakers(updatedSpeakers);
    filterVideos(selectedTopics, updatedSpeakers);
  }

  function filterVideos(topics, speakers) {
    let filteredVideos = videos;
    if (topics.length > 0) {
      filteredVideos = getVideosByTopics(videos, topics);
    }
    if (speakers.length > 0) {
      filteredVideos = getVideosBySpeakers(videos, speakers);
    }
    setSelectedVideos(filteredVideos);
  }

  function handleClose() {
    setIsError(null);
  }

  return (
    <div>
      {isError && <ErrorBlock message={isError} handleClose={handleClose} />}
      <div className={classes.interview}>
        <h1>Elder Interviews</h1>
      </div>
      <div
        className={`${classes["video-section"]} ${
          !currentUser ? classes["restricted"] : ""
        }`}
      >
        <div
          className={classes.mobFilter}
          onClick={() => setShowFilters((prevState) => !prevState)}
        >
          {!showFilters ? (
            <h3>Sort & Filter</h3>
          ) : (
            <div className={classes.openNav}>
              <div>
                <CancelButton />
              </div>
              <h3>Sort & Filter</h3>
              <p>Done</p>
            </div>
          )}
        </div>
        {showFilters && (
          <div className={classes.mobFilterNav}>
            <VideoNav
              selectedTopics={selectedTopics}
              videos={videos}
              selectedSpeakers={selectedSpeakers}
              onTopicChange={handleFilterTopicChange}
              onSpeakerChange={handleFilterSpeakerChange}
              mobile={true}
            />
          </div>
        )}
        <div className={classes.deskFilters}>
          <VideoNav
            selectedTopics={selectedTopics}
            videos={videos}
            selectedSpeakers={selectedSpeakers}
            onTopicChange={handleFilterTopicChange}
            onSpeakerChange={handleFilterSpeakerChange}
            mobile={false}
          />
        </div>
        <BrowseVideo videos={selectedVideos} />
      </div>
      {!currentUser && (
        <div className={classes.lockPanel}>
          <AccessButton />
        </div>
      )}
      {!currentUser && <RequestForm />}
    </div>
  );
}
