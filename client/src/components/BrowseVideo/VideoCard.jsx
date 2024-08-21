import React, { useEffect, useRef, useState } from "react";
import classes from "./VideoCard.module.css";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import Modal from "../../UI/Modal";
import CancelButton from "../Icons/cancel";

export default function VideoCard({ video }) {
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,
  // });

  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [thumbnail, setThumbnail] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const videoElement = videoRef.current;
  //   const canvasElement = canvasRef.current;
  //   const context = canvasElement.getContext('2d');

  //   videoElement.onloadeddata = () => {
  //     videoElement.currentTime = 2;
  //   };

  //   videoElement.onseeked = () => {
  //     context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  //     const thumbnailURL = canvasElement.toDataURL('image/png');
  //     setThumbnail(thumbnailURL);
  //   };
  // }, []);
  function handleCloseButton(){
    setIsPlaying(false)
  }
  return (
    <div className={classes["card-container"]}>
      <img
        src={"thumbnail"}
        alt={video.title}
        onClick={() => setIsPlaying(true)}
        className={classes.img}
      />
      {isPlaying && (
        <Modal className={classes.VideoModal}>
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
      {/* <video ref={videoRef} src={video.videoUrl} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} /> */}
    </div>
  );
}
