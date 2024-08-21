import React from 'react'
import classes from './ErrorBlock.module.css'
import Modal from './Modal'

export default function ErrorBlock({message, handleClose}) {
  return (
    <Modal className={classes['error-modal']}>
      <h2>Error</h2>
      <p>{message}</p>
        <div className={classes.controls}>
          <button Click={handleClose}>Close</button>
        </div>
    </Modal>
  )
}
