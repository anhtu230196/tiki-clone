import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function MyModal({ size, modalTitle, handleClose, children, show }) {
    return (
        <Modal size={size} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyModal
