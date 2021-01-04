import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Badge } from 'react-bootstrap';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectAuthAuthenticated,
  selectAuthUser,
} from '../../store/selectors/auth';
import { selectCartProductCount } from '../../store/selectors/product';
import { logout } from '../../store/actions/auth';

const NavBar = ({ logout, isAuthenticated, user, productCount }) => {
  const history = useHistory();

  const isHome = (
    <Fragment>
      <Nav.Link className='home' onClick={() => history.push('/')}>
        <i className='fas fa-home'></i>
        Home
      </Nav.Link>
    </Fragment>
  );

  const isShop = (
    <Fragment>
      <Nav.Link className='shop' onClick={() => history.push('/shop')}>
        <i className='fas fa-store'></i>
        Shop
      </Nav.Link>
    </Fragment>
  );

  const isCart = (
    <Fragment>
      <Nav.Link className='cart' onClick={() => history.push('/cart')}>
        <i className='fas fa-shopping-cart'></i>
        Cart
        <Badge variant='light' className='total-badge'>
          {productCount}
        </Badge>
      </Nav.Link>
    </Fragment>
  );

  const isLogin = (
    <Fragment>
      <Nav.Link
        className='login'
        onClick={() =>
          history.push(user.role === 0 ? '/user/dashboard' : '/admin/dashboard')
        }
      >
        <i className='fas fa-id-card'></i>
        {user && user.name}
      </Nav.Link>
      <Nav.Link className='login' onClick={logout}>
        <i className='fas fa-id-card'></i>
        Logout
      </Nav.Link>
    </Fragment>
  );

  const isLogout = (
    <Fragment>
      <Nav.Link className='login' onClick={() => history.push('/login')}>
        <i className='fas fa-user-plus'></i>
        Login
      </Nav.Link>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar bg='light' expand='lg' className='nav2-parent'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav2-child'>
            {isHome}
            {isShop}
            {isCart}
            {isAuthenticated ? isLogin : isLogout}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectAuthAuthenticated,
  user: selectAuthUser,
  productCount: selectCartProductCount,
});

export default connect(mapStateToProps, { logout })(NavBar);
