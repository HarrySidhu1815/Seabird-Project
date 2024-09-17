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
import Loading from "../UI/Loading";
import AdminBar from "../UI/AdminBar";

export default function Interviews() {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [videos, setVideos] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
      setSelectedVideos(data.videos);
      setIsLoading(false);
    }

    fetchVideo();
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

  if (videos) {
    content = (
      <div
        className={`${classes["video-section"]} ${
          !currentUser ? classes["restricted"] : ""
        }`}
      >
        {currentUser && (
          <>
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
                  handleSearchVideo={handleSearchVideo}
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
                handleSearchVideo={handleSearchVideo}
              />
            </div>
          </>
        )}

        <BrowseVideo videos={selectedVideos} />
      </div>
    );
  }

  function handleSearchVideo(input){

    if(input.trim() === ''){
      setSelectedVideos(videos)
    }

    const searchQuery = input.trim().toLowerCase()

    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchQuery))

    setSelectedVideos(filteredVideos)
  }

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
    let filteredVideos = videos || [];
    if (topics.length > 0) {
      filteredVideos = getVideosByTopics(videos, topics);
    }
    if (speakers.length > 0) {
      filteredVideos = getVideosBySpeakers(videos, speakers);
    }
    setSelectedVideos(filteredVideos);
  }

  return (
    <div>
      <div className={classes.interview}>
      {currentUser?.admin && <AdminBar />}
        <h1>Elder Interviews</h1>
        <p>
          The 99 videos that appear here were recorded during the later stages
          of the Covid pandemic. They were conducted as part of a series of
          interconnected research projects that Prof. Keith Carlson was invited
          to undertake into the history and culture of the Seabird Island
          community.
          <br />
          <br /> The Knowledge Keepers who shared their stories with Prof.
          Carlson requested that the interviews be made available to Seabird
          youth and educators.
          <br />
          <br /> Dr. Alessandro Tarsia stitched together the 99 mini documentary
          films and organized them around different themes. People can search
          the videos either by topic or by the names of the Elders and Knowledge
          Keepers who appear in the videos.
          <br />
          <br /> UFV BMO Collaboratorium students built curriculum resources,
          including teacher’s guides and lesson plans, that connect directly to
          the Elders’ voices in the videos.
        </p>
      </div>
      {content}
      {!currentUser && (
        <div className={classes.lockPanel}>
          <AccessButton />
        </div>
      )}
      {!currentUser && <RequestForm />}
    </div>
  );
}
