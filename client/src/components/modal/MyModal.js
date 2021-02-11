import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const MyModal = ({ product, show, handleClose, handleDeleteProduct }) => {
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Are you sure you want to delete {product && product.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose}>
            No
          </Button>
          <Button
            variant='success'
            onClick={() => handleDeleteProduct(product._id)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
