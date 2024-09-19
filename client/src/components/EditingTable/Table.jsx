import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import TableCell from "./TableCell";
import Modal from "../../UI/Modal";
import sortIcon from "../../assets/sort.svg";

export default function Table({
  data: initialData,
  headers,
  isInterview,
  showAll,
}) {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState({
    show: false,
    title: "",
    object: isInterview ? "video" : "lesson",
    id: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const headings = Object.keys(data[0]);
  const filteredHeadings = headings.filter((heading) => heading !== "_id");

  useEffect(() => {
    if (showAll) {
      setData(initialData);
    } else {
      setData(initialData.slice(0, 3));
    }
  }, [initialData, showAll]);

  function handleRemoveClick(id, title) {
    setShowModal((prevState) => ({
      ...prevState,
      show: true,
      title: title,
      id: id,
    }));
  }

  const sortData = (key, direction) => {
    console.log(key, direction);
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const requestSort = (key) => {
    if (key === "Title") {
      key = "title";
    } else if (key === "Theme") {
      key = "topic";
    } else if (key === "Lesson Title") {
      key = "title";
    } else if (key === 'Subject') {
      key = "subject"
    }
    
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = sortData(key, direction);

    setData(sortedData);
  };

  async function handleRemoveRecord(id) {
    try {
      const response = await fetch(
        `/api/${isInterview ? "videos" : "resources"}/remove/${id}`,
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
        title: "",
        object: isInterview ? "video" : "lesson",
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
              object: isInterview ? "video" : "lesson",
              id: "",
            });
          }}
        >
          <h2>Are you sure you to remove {showModal.title}?</h2>
          <p>
            This {showModal.object} will be permanently deleted from the website
            database, and will need to be re-uploaded to be accessed again. If
            you would like to remove the {showModal.object} only temporarily,
            set the visibility option to “Hidden”.
          </p>
          <div className={classes["action-buttons"]}>
            <button
              className={classes["remove-btn"]}
              onClick={() => handleRemoveRecord(showModal.id)}
            >
              Yes, Remove
            </button>
            <button
              className={classes["goback-btn"]}
              onClick={() => {
                setShowModal({
                  show: false,
                  title: "",
                  object: "",
                  object: isInterview ? "video" : "lesson",
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
              <th key={heading}>
                <div className={classes["table-heading"]}>
                  {heading}
                  {(heading === 'Title' || heading === 'Theme' || heading === 'Lesson Title' || heading === 'Subject')  && <img
                    onClick={() => requestSort(heading)}
                    src={sortIcon}
                    alt="sort"
                  />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes["table-body"]}>
          {data.map((record, index) => (
            <tr key={index}>
              {filteredHeadings.map((heading) => (
                <TableCell
                  key={`${index}-${heading}`}
                  record={record}
                  heading={heading}
                  isInterview={isInterview}
                  onSave={(updatedField) => {
                    const newData = [...data];
                    newData[index] = { ...newData[index], ...updatedField };
                    setData(newData);
                  }}
                />
              ))}
              <td
                className={classes.remove}
                onClick={() => {
                  handleRemoveClick(record._id, record.title);
                }}
              >
                Remove
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
