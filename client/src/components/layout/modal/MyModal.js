import React from 'react';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from './modaltypes/CenteredModal';

const MyModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant={props.variant} onClick={() => setModalShow(true)}>
        Testing modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default MyModal;
