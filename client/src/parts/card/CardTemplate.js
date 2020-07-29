import React from 'react';
import { Card } from 'react-bootstrap';

const CardTemplate = (props) => {
  return (
    <div>
      <Card.Img
        variant={props.variant}
        src={props.src}
        className={props.classImage}
      />
    </div>
  );
};

export default CardTemplate;
