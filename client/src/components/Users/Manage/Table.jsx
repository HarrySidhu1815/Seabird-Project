import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import Modal from "../../../UI/Modal";
import sortIcon from "../../../assets/sort.svg";

export default function Table({ headers, data: initialData, showAll }) {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const filteredHeadings = ['email', 'createdAt', 'lastActivity'];
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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
      const response = await fetch(`/api/user/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const sortData = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];
  
      if (key === "createdAt" || key === "lastActivity") {
        aValue = Date.parse(aValue);
        bValue = Date.parse(bValue);
      }

      if (aValue < bValue) {
        return direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };
  

  const requestSort = (key) => {
    if (key === "Email") {
      key = "email";
    } else if (key === "Date Added") {
      key = "createdAt";
    } else if (key === "Last Activity") {
      key = "lastActivity";
    }
    
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = sortData(key, direction);

    setData(sortedData);
  };

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
            They will no longer be able to access the materials and videos, and
            will need to be added as a new user to regain access.
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
                  <img
                    onClick={() => requestSort(heading)}
                    src={sortIcon}
                    alt="sort"
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes["table-body"]}>
          {data.map((record, index) => (
            <tr key={`${record._id}`}>
              {filteredHeadings.map((heading) => (
                <td key={`${heading}-${record._id}-${index}`}>
                  {heading === "createdAt" || heading === "lastActivity"
                    ? formatDate(record[heading])
                    : record[heading]}
                </td>
              ))}
              <td
                className={classes.remove}
                onClick={() => {
                  handleRemoveClick(record._id, record.email);
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
