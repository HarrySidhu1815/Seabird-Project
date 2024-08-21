import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import classes from './Modal.module.css'

const Modal = ({children, onClose, className = ''}) => {
    const dialog = useRef()
    useEffect(()=> {
        const modal = dialog.current;
        modal.showModal();

        return () => modal.close()
    }, [])
  return createPortal(
    <dialog ref={dialog} className={`${classes.modal} ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  )
}

export default Modal
