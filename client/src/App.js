import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './parts/navigationbar/NavigationBar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import UserRoute from './components/privaterouting/UserRoute';
import AdminRoute from './components/privaterouting/AdminRoute';
import UserDashboard from './pages/dashboard/user/UserDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import CreateCategory from './pages/dashboard/admin/CreateCategory';
import CreateProduct from './pages/dashboard/admin/CreateProduct';
import './App.scss';
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <UserRoute path='/user/dashboard' exact component={UserDashboard} />
            <AdminRoute
              path='/admin/dashboard'
              exact
              component={AdminDashboard}
            />
            <AdminRoute
              path='/create/category'
              exact
              component={CreateCategory}
            />
            <AdminRoute
              path='/create/product'
              exact
              component={CreateProduct}
            />
            <Redirect to='/' />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
