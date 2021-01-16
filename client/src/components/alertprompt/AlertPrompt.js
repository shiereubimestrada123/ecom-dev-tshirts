import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'react-bootstrap';
import { selectAlert } from '../../store/selectors/alertPrompt';

const AlertPrompt = ({ alertPrompt }) =>
  alertPrompt.map((alert) => (
    <Alert
      key={alert.id}
      variant={alert.alertType}
      style={{ marginTop: '80px' }}
    >
      {alert.msg}
    </Alert>
  ));

const mapStateToProps = createStructuredSelector({
  alertPrompt: selectAlert,
});

export default connect(mapStateToProps)(AlertPrompt);
