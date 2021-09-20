import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const MyVerticallyCenteredModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.head}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>{props.text}</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal
