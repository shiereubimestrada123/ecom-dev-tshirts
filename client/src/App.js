import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/layout/NavigationBar';
import Register from './components/auth/Register';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <NavigationBar />
        <Container>
          <Switch>
            <Route exact path='/register' component={Register} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
};

export default App;
