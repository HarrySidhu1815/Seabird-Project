import React from "react";
import classes from "./VideoNav.module.css";
import { DUMMY_DATA, getAllSpeakers, getAllTopics } from "../../util/video";

export default function VideoNav({
  selectedTopics,
  selectedSpeakers,
  onTopicChange,
  onSpeakerChange,
  videos
}) {
  const allTopics = getAllTopics(videos);
  const allspeakers = getAllSpeakers(videos);

  return (
    <div className={classes.sideFilter}>
      <div className={classes["topic-filter"]}>
        <h3>Sort by Topic</h3>
        {allTopics.map((topic, index) => (
          <div key={index}>
            <input
              id="selectedTopic"
              type="checkbox"
              onChange={() => onTopicChange(topic)}
              checked={selectedTopics.includes(topic)}
            />
            <label htmlFor="selectedTopic">{topic}</label>
          </div>
        ))}
      </div>
      <div className={classes["speaker-filter"]}>
        <h3>Sort by Speaker(s)</h3>
        {allspeakers.map((speaker, index) => (
          <div key={index}>
            <input
              id="selectedSpeaker"
              type="checkbox"
              onChange={() => onSpeakerChange(speaker)}
              checked={selectedSpeakers.includes(speaker)}
              name="speakers"
            />
            <label htmlFor="selectedSpeaker">{speaker}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
