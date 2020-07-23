import React from 'react';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from './modaltypes/CenteredModal';

const MyModal = (props) => {
  const { heading, body, text, title } = props;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant={props.variant}
        style={{ borderRadius: '0' }}
        onClick={() => setModalShow(true)}
      >
        {text}
      </Button>

      <MyVerticallyCenteredModal
        title={title}
        heading={heading}
        body={body}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default MyModal;
