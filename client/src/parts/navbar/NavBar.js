import React, { Fragment, useState } from 'react';
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
  const [scrollnav, setScrollNav] = useState(false);

  const scrollfunc = () => {
    if (window.scrollY >= 100) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  window.addEventListener('scroll', scrollfunc);

  const history = useHistory();

  const isHome = (
    <Fragment>
      <Nav.Link eventKey='1' className='home' onClick={() => history.push('/')}>
        <i className='fas fa-home'></i>
        <span>Home</span>
      </Nav.Link>
    </Fragment>
  );

  const isShop = (
    <Fragment>
      <Nav.Link
        eventKey='2'
        className='shop'
        onClick={() => history.push('/shop')}
      >
        <i className='fas fa-store'></i>
        <span>Shop</span>
      </Nav.Link>
    </Fragment>
  );

  const isCart = (
    <Fragment>
      <Nav.Link
        eventKey='3'
        className='cart'
        onClick={() => history.push('/cart')}
      >
        <i className='fas fa-shopping-cart'></i>
        <span>Cart</span>
        <Badge variant='light' className='total-badge'>
          {productCount}
        </Badge>
      </Nav.Link>
    </Fragment>
  );

  const isLogin = (
    <Fragment>
      <Nav.Link
        eventKey='4'
        className='login'
        onClick={() =>
          history.push(user.role === 0 ? '/user/dashboard' : '/admin/dashboard')
        }
      >
        <i className='fas fa-id-card'></i>
        <span> {user && user.name}</span>
      </Nav.Link>
      <Nav.Link eventKey='5' className='login' onClick={logout}>
        <i className='fas fa-sign-out-alt'></i>
        <span>Logout</span>
      </Nav.Link>
    </Fragment>
  );

  const isLogout = (
    <Fragment>
      <Nav.Link
        eventKey='6'
        className='login'
        onClick={() => history.push('/login')}
      >
        <i className='fas fa-sign-in-alt'></i>
        <span>Login</span>
      </Nav.Link>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        fixed='top'
        expand='lg'
        className={scrollnav ? 'nav2-parent active' : 'nav2-parent'}
      >
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
