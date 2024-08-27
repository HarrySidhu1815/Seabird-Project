import React from 'react'
import classes from './ErrorBlock.module.css'
import Modal from './Modal'

export default function ErrorBlock({message, handleClose}) {
  return (
    <Modal className={classes['error-modal']} onClose={handleClose}>
      <h2>Error</h2>
      <p>{message}</p>
        <div className={classes.controls}>
          <button onClick={handleClose}>Close</button>
        </div>
    </Modal>
  )
}
