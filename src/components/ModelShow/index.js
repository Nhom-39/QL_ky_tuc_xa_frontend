import Btn from '../Button/Button';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function ModalShow({ handleShow, show, handleClose, textButton, body, textHeader }) {
    return (
        <>
            <Btn outline onClick={handleShow}>
                {textButton}
            </Btn>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{textHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalShow;
