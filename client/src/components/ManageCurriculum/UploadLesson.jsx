import React, { useRef, useState } from "react";
import Modal from "../../UI/Modal";
import CancelButton from "../Icons/cancel";
import uploadIcon from "../../assets/uploadIcon.svg";
import classes from "./UploadLesson.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { addSubject } from "../../redux/subject/subjectSlice";

export default function UploadLesson({ handleCloseModal, refreshCurriculum}) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade: "",
    decription: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false); 
  const [newSubject, setNewSubject] = useState("");
  const fileRef = useRef();
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);

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

  function handleSubjectChange(e) {
    const { value } = e.target;
    
    if (value === "add-new") {
      setIsAddingSubject(true); 
    } else {
      setFormData({ ...formData, subject: value });
      setIsAddingSubject(false);
    }
  }

  const handleFileUpload = async () => {
    try {

      let contentType;
      if (selectedFile.name.endsWith('.zip')) {
        contentType = 'application/zip';
      } else if (selectedFile.name.endsWith('.pdf')) {
        contentType = 'application/pdf';
      } else if (selectedFile.name.endsWith('.docx')) {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else if (selectedFile.name.endsWith('.doc')) {
        contentType = 'application/msword';
      }else {
        throw new Error('Unsupported file type');
      }

      const response = await fetch('/api/resources/generate-presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: selectedFile.name,
          fileType: contentType
        })
      });

      const { url } = await response.json();


      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType
        },
        body: selectedFile
      });

      if (uploadResponse.ok) {
        alert('File uploaded successfully!');
        return url.split('?')[0];
      } else {
        throw new Error('Failed to upload lesson');
      }
    } catch (error) {
      alert('Error uploading lesson: ' + error.message);
      return null;
    }
  };

  async function handleFormSubmit(e){
    e.preventDefault();
    setUploading(true);

    const fileUrl = await handleFileUpload();
    if (!fileUrl) {
      setUploading(false);
      return;
    }

    const response = await fetch('/api/resources/upload-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: formData.title,
        subject: formData.subject,
        grade: formData.grade,
        description: formData.decription,
        fileUrl,
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

    function handleAddSubject() {
      if (newSubject.trim()) {
        dispatch(addSubject(newSubject));
        setFormData({ ...formData, subject: newSubject });
        setIsAddingSubject(false);  
        setNewSubject(''); 
      }
    }

  return (
    <Modal className={classes["upload-modal"]} onClose={handleCloseModal}>
      <div className={classes["cancel-video"]} onClick={handleCloseModal}>
        <CancelButton />
      </div>
      <div className={classes["modal-content"]}>
        <h2>Upload Curriculum Materials</h2>
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
              <h3>Choose File (.docx, zipped folder or .pdf)</h3>
              <input
                ref={fileRef}
                type="file"
                name="file"
                accept=".zip, .pdf, .doc, .docx"
                onChange={handleFileChange}
                className={classes["file-input"]}
              />
              {selectedFile && <p className={classes["select-file"]}>{selectedFile.name} uploaded successfully</p>}
            </div>
          </div>
          <label htmlFor="title">Lesson Title*</label>
          <input
            value={formData.title}
            onChange={handleInputChange}
            name="title"
            type="text"
            placeholder="Lesson Title"
            required
            id="title"
          />
          <label htmlFor="subject">Subject*</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
            required
            id="subject"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
            <option value="add-new">Add New Subject</option>
          </select>

          {/* Custom subject input */}
          {isAddingSubject && (
            <div>
              <input
                type="text"
                placeholder="Enter custom subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <span type="button" onClick={handleAddSubject}>Add Subject</span>
            </div>
          )}

          <label htmlFor="grade">Grade Level*</label>
          <input
            value={formData.grade}
            onChange={handleInputChange}
            name="grade"
            type="text"
            placeholder="(Ex. K, 2, 4-6, 10-12, Any Grade)"
            required
            id="grade"
          />
          <label htmlFor="decription">Decription*</label>
          <textarea
            value={formData.decription}
            onChange={handleInputChange}
            name="decription"
            type="text"
            placeholder="Description of lesson and materials"
            required
            id="decription"
            rows={4}
          />
          
          <button disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
        </form>
      </div>
    </Modal>
  );
}
