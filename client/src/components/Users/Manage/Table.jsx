import React, { useEffect, useState } from 'react'
import classes from './Table.module.css'
import Modal from '../../../UI/Modal';

export default function Table({headers, data: initialData, showAll}) {

    const [data, setData] = useState(initialData);

    const headings = Object.keys(data[0]);
    const filteredHeadings = headings.filter((heading) => heading !== "_id");
    const [showModal, setShowModal] = useState({
        show: false,
        email: "",
        id: "",
      });
    
      function handleRemoveClick(id, email) {
        setShowModal((prevState) => ({
          ...prevState,
          show: true,
          email: email,
          id: id,
        }));
      }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };

      useEffect(() => {
        if (showAll) {
          setData(initialData);
        } else {
          setData(initialData.slice(0, 3));
        }
      }, [initialData, showAll]);

      async function handleRemoveRecord(id) {
        try {
          const response = await fetch(
            `/api/user/remove/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const data = await response.json();
    
          if (!response.ok) {
            alert("Failed to delete the record:", data.message);
            return;
          }
    
          setData((prevState) => prevState.filter((record) => record._id !== id));
          setShowModal({
            show: false,
            email: "",
            id: "",
          });
        } catch (error) {
          alert("Failed to delete the record:", error.message);
        }
      }

  return (
    <>
    {showModal.show && (
        <Modal
        className={classes["remove-modal"]}
        onClose={() => {
          setShowModal({
            show: false,
            title: "",
            object: "",
            id: "",
          });
        }}
      >
        <h2>Are you sure you to remove {showModal.email}?</h2>
        <p>
          This {showModal.object} will be permanently deleted from the website database, and
          will need to be re-uploaded to be accessed again. If you would like to
          remove the video only temporarily, set the visibility option to
          “Hidden”.
        </p>
        <div className={classes["action-buttons"]}>
          <button className={classes["remove-btn"]} onClick={() => handleRemoveRecord(showModal.id)}>Yes, Remove</button>
          <button className={classes["goback-btn"]}
            onClick={() => {
              setShowModal({
                show: false,
                title: "",
                object: "",
                id: "",
              });
            }}
          >
            No, go back
          </button>
        </div>
      </Modal>
      )}
    <table className={classes.table}>
        <thead className={classes["table-head"]}>
          <tr>
            {headers.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className={classes["table-body"]}>
          {data.map((record, index) => (
            <tr key={`${record._id}`}>
              {filteredHeadings.map((heading) => (
                <td key={`${heading}-${record._id}-${index}`}>{(heading === 'createdAt' || heading === 'lastActivity') 
                    ? formatDate(record[heading]) 
                    : record[heading]}</td>
              ))}
              <td
                className={classes.remove}
                onClick={() => {handleRemoveClick(record._id, record.email)}}
              >
                Remove
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
