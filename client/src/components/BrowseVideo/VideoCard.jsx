import React, { useEffect, useRef, useState } from "react";
import classes from "./VideoCard.module.css";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import Modal from "../../UI/Modal";
import CancelButton from "../Icons/cancel";
import videoThumbnail from '../../assets/thumbnail.png'

export default function VideoCard({ video }) {
 
  const [isPlaying, setIsPlaying] = useState(false);

  function handleCloseButton(){
    setIsPlaying(false)
  }
  return (
    <div className={classes["card-container"]}>
      <div className={classes["thumbnail-container"]} onClick={() => setIsPlaying(true)}>
        <img
          src={videoThumbnail}
          alt={video.title}
          className={classes.img}
        />
        <div className={classes["play-button"]}></div>
      </div>
      {isPlaying && (
        <Modal className={classes.VideoModal} onClose={handleCloseButton}>
          <div onClick={handleCloseButton}>
            <CancelButton />
          </div>
          <ReactPlayer
            className={classes.video}
            url={video.videoUrl}
            controls={true}
            height='auto'
            width="100%"
          />
          <h2>{video.title}</h2>
          <p>
            <i>{video.topic}</i>
            <br />
            Features: {video.speakers.join(", ")}
          </p>
        </Modal>
      )}
      <div className={classes["card-decription"]}>
        <h2>{video.title}</h2>
        <p>
          <i>{video.topic}</i>
          <br />
          Features: {video.speakers.join(", ")}
        </p>
      </div>
    </div>
  );
}
