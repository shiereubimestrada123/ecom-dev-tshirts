import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './parts/navigationbar/NavigationBar';
// import Navigation from './parts/navigation/Navigation';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Product from './pages/product/Product';
import Cart from './pages/cart/Cart';
import UserRoute from './components/privaterouting/UserRoute';
import AdminRoute from './components/privaterouting/AdminRoute';
import UserDashboard from './pages/dashboard/user/userdashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/admin/admindashboard/AdminDashboard';
import CreateCategory from './pages/dashboard/admin/createcategory/CreateCategory';
import CreateProduct from './pages/dashboard/admin/createproduct/CreateProduct';
import Checkout from './pages/checkout/Checkout';
import NotFound from './pages/dashboard/notfound/NotFound';

import './App.scss';
// Redux
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store/store';
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
        {/* <PersistGate persistor={persistor}> */}
        <NavigationBar />
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/product/:productId' exact component={Product} />
            <Route path='/cart' exact component={Cart} />
            <UserRoute path='/user/dashboard' exact component={UserDashboard} />
            <Route path='/checkout' exact component={Checkout} />
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
            <Route component={NotFound} />
          </Switch>
        </Container>
        {/* </PersistGate> */}
      </Router>
    </Provider>
  );
};

export default App;
