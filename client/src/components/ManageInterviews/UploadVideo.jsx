import React, { useRef, useState } from "react";
import Modal from "../../UI/Modal";
import CancelButton from "../Icons/cancel";
import uploadIcon from "../../assets/uploadIcon.svg";
import classes from "./UploadVideo.module.css";

export default function UploadVideo({ handleCloseModal, refreshCurriculum }) {
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    speakers: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleInputChange(e){
    const {name, value} = e.target

    setFormData(prevState => 
        ({
        ...prevState,
        [name]: value
    }))
  }

  const handleFileUpload = async () => {
    try {
      const response = await fetch('/api/videos/generate-presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: selectedFile.name,
          fileType: selectedFile.type
        })
      });

      const { url } = await response.json();

      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': selectedFile.fileType || 'video/mp4'
        },
        body: selectedFile
      });

      if (uploadResponse.ok) {
        alert('File uploaded successfully!');
        return url.split('?')[0];
      } else {
        throw new Error('Failed to upload video');
      }
    } catch (error) {
      alert('Error uploading video: ' + error.message);
      return null;
    }
  };

  async function handleFormSubmit(e){
    e.preventDefault();
    setUploading(true);

    const videoUrl = await handleFileUpload();
    if (!videoUrl) {
      setUploading(false);
      return;
    }

    // Step 3: Save metadata to backend
    const response = await fetch('/api/videos/upload-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: formData.title,
        theme: formData.theme,
        speakers: formData.speakers,
        videoUrl
      })
    });

    const result = await response.json();
    if (response.ok) {
      alert('Video metadata saved successfully');

      refreshCurriculum();
      handleCloseModal();
    } else {
      alert('Error saving video metadata: ' + result.message);
    }
    setUploading(false);
    };

  return (
    <Modal className={classes["upload-modal"]} onClose={handleCloseModal}>
      <div className={classes["cancel-video"]} onClick={handleCloseModal}>
        <CancelButton />
      </div>
      <div className={classes["modal-content"]}>
        <h2>Upload New Video</h2>
        <form className={classes["upload-form"]} onSubmit={handleFormSubmit}>
          <div className={classes["upload-file"]}>
            <img
              className={classes["upload-image"]}
              src={uploadIcon}
              alt="upload Icon"
              onClick={() => {
                fileRef.current.click();
              }}
            />
            <div className={classes["choose-file"]}>
              <h3>Choose File (mp4)</h3>
              <input
                ref={fileRef}
                type="file"
                name="videoFile"
                accept="video/mp4"
                onChange={handleFileChange}
                className={classes["file-input"]}
              />
              {selectedFile && <p className={classes['select-file']}>{selectedFile.name} uploaded successfully</p>}
            </div>
          </div>
          <label htmlFor="title">Title*</label>
          <input
            value={formData.title}
            onChange={handleInputChange}
            name="title"
            type="text"
            placeholder="Video Title"
            required
            id="title"
          />
          <label htmlFor="theme">Theme*</label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
            required
            id="theme"
          >
            <option value="">Select Theme</option>
            <option value='Sxwoxwiyam'>Sxwoxwiyam</option>
            <option value='Narratives'>Narratives</option>
            <option value='Biographical Profiles of Seabird Elders from Past and Present'>Biographical Profiles of Seabird Elders from Past and Present</option>
            <option value='Family Histories of Living On, and Off Of, the Land'>Family Histories of Living On, and Off Of, the Land</option>
            <option value='Wage Labour'>Wage Labour</option>
            <option value='Memorable Events, Occurrences, Happenings, and People'>Memorable Events, Occurrences, Happenings, and People</option>
            <option value='Memoryscapes and Memory Places'>Memoryscapes and Memory Places</option>
            <option value='Band History Since Becoming Independent In 1958'>Band History Since Becoming Independent In 1958</option>
            <option value='Cultural Traditions'>Cultural Traditions</option>
            <option value='Keith Carlson Explains'>Keith Carlson Explains</option>
          </select>
          <label htmlFor="speakers">Speaker(s)*</label>
          <input
            value={formData.speakers}
            onChange={handleInputChange}
            name="speakers"
            type="text"
            placeholder="Lastname, Firstname"
            required
            id="speakers"
          />
          <p>
            To add multiple speakers, separate names with a semi-colon
            <br />
            Ex. Wayne, Bobb; Carlson, Keith; McHalsie, Sonny
          </p>
          <button disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
        </form>
      </div>
    </Modal>
  );
}
