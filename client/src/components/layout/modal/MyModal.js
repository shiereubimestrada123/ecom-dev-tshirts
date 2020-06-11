import React from 'react';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from '../../../utils/MyVerticallyCenteredModal';

const MyModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default MyModal;
