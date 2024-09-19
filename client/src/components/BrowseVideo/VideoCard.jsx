import React, { useEffect, useRef, useState } from "react";
import classes from "./VideoCard.module.css";
import ReactPlayer from "react-player";
import Modal from "../../UI/Modal";
import videoThumbnail from "../../assets/thumbnail.png";
import cancelBtn from "../../assets/cancelBtn.svg";

export default function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  function handleCloseButton() {
    setIsPlaying(false);
  }
  return (
    <div className={classes["card-container"]}>
      <div
        className={classes["thumbnail-container"]}
        onClick={() => setIsPlaying(true)}
      >
        <img src={videoThumbnail} alt={video.title} className={classes.img} />
        <div className={classes["play-button"]}></div>
      </div>
      {isPlaying && (
        <Modal className={classes.VideoModal} onClose={handleCloseButton}>
          <img
          className={classes['cancel-btn']}
            onClick={handleCloseButton}
            src={cancelBtn}
            alt="Cancel Button"
          />
          <div className={classes['modal-content']}>
            <ReactPlayer
              className={classes.video}
              url={video.videoUrl}
              controls={true}
              height="auto"
              width="100%"
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
            <h2>{video.title}</h2>
            <p>
              <i>{video.topic}</i>
              <br />
              Features: {video.speakers.join(", ")}
            </p>
          </div>
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
