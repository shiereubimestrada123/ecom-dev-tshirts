import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/layout/navigationbar/NavigationBar';
import AlertPrompt from './components/layout/alertprompt/AlertPrompt';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import './App.scss';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavigationBar />
          <Container>
            <AlertPrompt />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
