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
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../util/http";
import { useNavigate } from "react-router-dom";

export default function Interviews() {
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  // const [videos, setVideos] = useState([]);
  // const [isError, setIsError] = useState(null);

  const { data, isError, isPending } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  useEffect(() => {
    if (data) {
      setSelectedVideos(data);
    }
  }, [data]);

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
    let filteredVideos = data || [];
    if (topics.length > 0) {
      filteredVideos = getVideosByTopics(data, topics);
    }
    if (speakers.length > 0) {
      filteredVideos = getVideosBySpeakers(data, speakers);
    }
    setSelectedVideos(filteredVideos);
  }

  function handleClose() {
    navigate('../')
  }

  return (
    <div>
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
            {data && (
              <VideoNav
                selectedTopics={selectedTopics}
                videos={data}
                selectedSpeakers={selectedSpeakers}
                onTopicChange={handleFilterTopicChange}
                onSpeakerChange={handleFilterSpeakerChange}
                mobile={true}
              />
            )}
          </div>
        )}
        <div className={classes.deskFilters}>
          {data && (
            <VideoNav
              selectedTopics={selectedTopics}
              videos={data}
              selectedSpeakers={selectedSpeakers}
              onTopicChange={handleFilterTopicChange}
              onSpeakerChange={handleFilterSpeakerChange}
              mobile={false}
            />
          )}
        </div>

        {isError && <ErrorBlock message={isError} handleClose={handleClose}/>}

        {isPending && (<p>Loading the videos....</p>)} 

        {data && <BrowseVideo videos={selectedVideos} />}

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
