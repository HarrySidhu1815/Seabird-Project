import React, { useState } from "react";
import classes from "./VideoNav.module.css";
import { getAllSpeakers, getAllTopics } from "../../util/video";
import DropDownButton from "../Icons/dropArrow";

export default function VideoNav({
  selectedTopics,
  selectedSpeakers,
  onTopicChange,
  onSpeakerChange,
  videos,
  mobile,
}) {
  const allTopics = getAllTopics(videos);
  const allspeakers = getAllSpeakers(videos);

  const [showTopic, setShowTopic] = useState(false);
  const [showSpeakers, setShowSpeakers] = useState(false);

  return (
    <div className={classes.sideFilter}>
      <div className={classes["topic-filter"]}>
      {mobile ? (<div className={classes.sortHeading}>
          <h3>Sort by Topic{" "}</h3>
          <span
            onClick={() => {
              setShowTopic((prevState) => !prevState);
            }}
          >
            <div className={classes.arrow}><DropDownButton /></div>
          </span>
        </div>) : (<h3>Sort by Topic</h3>)}
        
        {mobile ? showTopic &&
          allTopics.map((topic, index) => (
            <div key={index}>
              <input
                id="selectedTopic"
                type="checkbox"
                onChange={() => onTopicChange(topic)}
                checked={selectedTopics.includes(topic)}
              />
              <label htmlFor="selectedTopic">{topic}</label>
            </div>
          )) : allTopics.map((topic, index) => (
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
        <div className={classes.sortHeading}>
          <h3>Sort by Speaker(s){" "}</h3>
          {mobile && (<span
            onClick={() => {
              setShowSpeakers((prevState) => !prevState);
            }}
          >
            <div className={classes.arrow}><DropDownButton /></div>
          </span>) }
          
        </div>
        {mobile ? showSpeakers &&
          allspeakers.map((speaker, index) => (
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
          )) : allspeakers.map((speaker, index) => (
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
