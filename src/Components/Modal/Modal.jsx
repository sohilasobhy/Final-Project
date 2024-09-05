import Modal from 'react-bootstrap/Modal';
import "./Modal.scss"
function CustomModal({ title, children, show, onHide }) {
    return (
        <Modal className='' onHide={onHide} show={show} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default CustomModal;