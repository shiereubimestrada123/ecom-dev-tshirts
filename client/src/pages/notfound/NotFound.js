import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NotFound = (props) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <div className='parent-not-found'>
        <h1>404</h1>
        <p>Sorry page not found</p>
        <Button variant='secondary' type='submit' onClick={goBack}>
          Go Back
        </Button>
      </div>
    </Fragment>
  );
};

export default NotFound;
