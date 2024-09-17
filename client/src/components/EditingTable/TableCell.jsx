import { useEffect, useState } from "react";
import ErrorBlock from "../../UI/ErrorBlock";
import classes from "./Table.module.css";
import Modal from "../../UI/Modal";

export default function TableCell({ record, heading, isInterview, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(record[heading]);
    const [hasChanged, setHasChanged] = useState(false);
  
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      setCurrentValue(Array.isArray(record[heading]) ? record[heading].join(', ') : record[heading]);
      setHasChanged(false);
    }, [record, heading]);
  
    function handleInputChange(e) {
      setCurrentValue(e.target.value);
      setHasChanged(e.target.value.trim() !== record[heading]);
    }
  
    function handleSelectChange(e) {
        const newValue = e.target.value;
        setCurrentValue(newValue);
        
        const changed = newValue !== record[heading];
        setHasChanged(changed);
      }
      
  
    async function handleSaveChanges(updatedInput, id) {
      if (!hasChanged) {
          setIsEditing(false)
          return;
      }
      
      setIsLoading(true);
      const response = await fetch(`/api/${isInterview ? 'videos' : 'resources'}/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedField: updatedInput }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message);
        setIsLoading(false);
      } else {
        setSuccess(true);
        setIsLoading(false);
        onSave(updatedInput);
      }
  
      setIsEditing(false);
    }
  
    let content;
  
    if (success) {
      content = (
        <Modal
          className={classes.successModal}
          onClose={() => {
            setSuccess(false);
          }}
        >
          <h2>Success</h2>
          <p>Your changes have been saved</p>
          <button
            onClick={() => {
              setSuccess(false);
            }}
          >
            Okay
          </button>
        </Modal>
      );
    }
  
    if (error) {
      content = (
        <ErrorBlock
          message={error}
          handleClose={() => {
            setError(null);
          }}
        />
      );
    }
  
    function convertToArray(value) {
      return value.split(',').map(item => item.trim());
    }
  
    function handleSave() {
      let updatedValue = currentValue;
  
      if (Array.isArray(record[heading])) {
        updatedValue = convertToArray(currentValue);
      }
      handleSaveChanges(
        {
          [heading]: updatedValue,
        },
        record._id
      );
    }
  
    return (
      <td>
        <div className={classes.cell}>
          {content}
          { heading === 'visibility' ? (
            <>
              <select
                className={classes.input}
                value={currentValue}
                onChange={handleSelectChange}
              >
                <option value="Public">Public</option>
                <option value="Members Only">Members Only</option>
                <option value="Hidden">Hidden</option>
              </select>
              {hasChanged && 
                 <button
                 onClick={handleSave}
               >
                 Save
               </button>
              }
             
            </>
            ) : isEditing ? (
            <>
              {
              (
              <textarea
                className={classes.input}
                rows={2}
                type="text"
                onChange={handleInputChange}
                value={currentValue}
              ></textarea>
            )}
              <button
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>{Array.isArray(record[heading]) ? record[heading].join(', ') : record[heading]}</p>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </td>
    );
  }