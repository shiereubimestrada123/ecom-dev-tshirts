import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AlertPrompt = ({ alertPrompt }) =>
  alertPrompt.map((alert) => (
    <Alert key={alert.id} variant={alert.alertType} className='my-4'>
      {alert.msg}
    </Alert>
  ));

const mapStateToProps = (state) => ({
  alertPrompt: state.alertPrompt,
});

export default connect(mapStateToProps)(AlertPrompt);
