import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// import NavigationBar from './parts/navigationbar/NavigationBar';
import NavBar from './parts/navbar/NavBar';
import Footer from './parts/footer/Footer';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Product from './pages/product/Product';
import Cart from './pages/cart/Cart';
import UserRoute from './components/privaterouting/UserRoute';
import AdminRoute from './components/privaterouting/AdminRoute';
import UserDashboard from './pages/dashboard/user/userdashboard/UserDashboard';
import UserAccount from './pages/dashboard/user/useraccount/UserAccount';
import UserPurchase from './pages/dashboard/user/userpurchase/UserPurchase';
import AdminDashboard from './pages/dashboard/admin/admindashboard/AdminDashboard';
import CreateCategory from './pages/dashboard/admin/createcategory/CreateCategory';
import CreateProduct from './pages/dashboard/admin/createproduct/CreateProduct';
import ManageProducts from './pages/dashboard/admin/manageproducts/ManageProducts';
import ProductUpdate from './pages/dashboard/admin/productupdate/ProductUpdate';
import Orders from './pages/dashboard/admin/orders/Orders';
import Checkout from './pages/checkout/Checkout';
import NotFound from './pages/dashboard/notfound/NotFound';

import './App.scss';
// import './index.scss';

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
        {/* <NavigationBar /> */}
        <NavBar />
        <Container style={{ minHeight: '90vh' }}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/product/:productId' exact component={Product} />
            <Route path='/cart' exact component={Cart} />
            <UserRoute path='/user/dashboard' exact component={UserDashboard} />
            <UserRoute path='/user/account' exact component={UserAccount} />
            <UserRoute path='/user/purchase' exact component={UserPurchase} />
            <UserRoute path='/checkout' exact component={Checkout} />
            <AdminRoute
              path='/admin/dashboard'
              exact
              component={AdminDashboard}
            />
            <AdminRoute
              path='/admin/create/category'
              exact
              component={CreateCategory}
            />
            <AdminRoute
              path='/admin/create/product'
              exact
              component={CreateProduct}
            />
            <AdminRoute
              path='/admin/products'
              exact
              component={ManageProducts}
            />
            <AdminRoute
              path='/admin/product/update/:productId'
              exact
              component={ProductUpdate}
            />
            <AdminRoute path='/admin/orders' exact component={Orders} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
