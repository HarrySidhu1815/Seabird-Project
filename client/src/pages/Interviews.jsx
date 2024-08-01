import React, { useState } from "react";
import RequestForm from "../components/RequestForm/RequestForm";
import Interview from "../components/Interview/Interview";
import VideoNav from "../components/VideoNav/VideoNav";
import { DUMMY_DATA, getVideosBySpeakers, getVideosByTopics } from "../util/video";
import BrowseVideo from "../components/BrowseVideo/BrowseVideo";
import classes from './Interviews.module.css'

export default function Interviews() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState(DUMMY_DATA);

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
    let filteredVideos = DUMMY_DATA;
    if (topics.length > 0) {
      filteredVideos = getVideosByTopics(filteredVideos, topics);
    }
    if (speakers.length > 0) {
      filteredVideos = getVideosBySpeakers(filteredVideos, speakers);
    }
    setSelectedVideos(filteredVideos);
  }

  return (
    <div>
      <Interview />
      <div className={classes['video-section']}>
        <VideoNav
          selectedTopics={selectedTopics}
          selectedSpeakers={selectedSpeakers}
          onTopicChange={handleFilterTopicChange}
          onSpeakerChange={handleFilterSpeakerChange}
        />
        <BrowseVideo videos={selectedVideos} />
      </div>
      <RequestForm />
    </div>
  );
}
