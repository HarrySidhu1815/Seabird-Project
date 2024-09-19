import React, { useRef, useState } from "react";
import classes from "./VideoNav.module.css";
import { getAllSpeakers, getAllTopics } from "../../util/video";
import DropDownButton from "../Icons/dropArrow";
import searchBar from "../../assets/searchBar.svg";

export default function VideoNav({
  selectedTopics,
  selectedSpeakers,
  onTopicChange,
  onSpeakerChange,
  handleSearchVideo,
  clearFilters,
  videos,
  mobile,
}) {
  const allTopics = getAllTopics(videos);
  const allspeakers = getAllSpeakers(videos);

  const searchInputRef = useRef()

  const [showTopic, setShowTopic] = useState(false);
  const [showSpeakers, setShowSpeakers] = useState(false);

  function handleSearchClick(e){
    e.preventDefault()
    const searchValue = searchInputRef.current.value

    if(!searchValue){
      handleSearchVideo('')
    }

    handleSearchVideo(searchValue)
  }

  return (
    <div className={classes.sideFilter}>
      <p className={classes['clear-filters']} onClick={clearFilters}>Clear all filters</p>
      <div className={classes["search-bar"]}>
        <form className={classes.searchInput}>
          <button className={classes.searchButton} onClick={handleSearchClick}>
            <img src={searchBar} alt="Submit" />
          </button>
          <input type="text" placeholder="Search by name or number" ref={searchInputRef}/>
        </form>
      </div>

      <div className={classes["topic-filter"]}>
        {mobile ? (
          <div className={classes.sortHeading}>
            <h3>Sort by Topic </h3>

            <span
              onClick={() => {
                setShowTopic((prevState) => !prevState);
              }}>

              <div className={classes.arrow}>
                <DropDownButton />
              </div>

            </span>

          </div>
        ) : (
          <h3>Sort by Topic</h3>
        )}

        {mobile
          ? showTopic &&
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
            ))
          : allTopics.map((topic, index) => (
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

      {mobile ? (
          <div className={classes.sortHeading}>
            <h3>Sort by Speaker(s) </h3>

            <span
              onClick={() => {
                setShowSpeakers((prevState) => !prevState);
              }}>

              <div className={classes.arrow}>
                <DropDownButton />
              </div>

            </span>

          </div>
        ) : (
          <h3>Sort by Speaker(s)</h3>
        )}

        {mobile
          ? showSpeakers &&
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
            ))
          : allspeakers.map((speaker, index) => (
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
