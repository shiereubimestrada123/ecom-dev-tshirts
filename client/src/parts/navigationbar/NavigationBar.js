import React, { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, Button, Card } from 'react-bootstrap';
import { logout } from '../../store/actions/auth';
import CardTemplate from '../card/CardTemplate';
import CartDropdown from '../../pages/cart/CartDropdown';

const NavigationBar = ({
  auth: { isAuthenticated, user },
  product: { cartProducts },
  logout,
}) => {
  console.log(cartProducts);

  const [isShownRegisterLogin, setIsShownRegisterLogin] = useState(false);
  const [isCartContentShown, setIsCartContentShown] = useState(false);

  const isLogin = (
    <div
      className='holder-user-icon'
      onMouseEnter={() => setIsShownRegisterLogin(true)}
      onMouseLeave={() => setIsShownRegisterLogin(false)}
    >
      {isShownRegisterLogin ? (
        <Fragment>
          <i className='fas fa-id-card' style={{ color: '#5076a0' }}></i>
          <ul
            className='hovered-user-icon'
            onClick={() => setIsShownRegisterLogin(false)}
          >
            {user && user.role === 0 ? (
              <li>
                <NavLink to='/user/dashboard' exact activeClassName='current'>
                  User
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to='/admin/dashboard' exact activeClassName='current'>
                  Admin
                </NavLink>
              </li>
            )}
            <li onClick={logout}>
              <NavLink to='/' exact>
                Logout
              </NavLink>
            </li>
          </ul>
        </Fragment>
      ) : (
        <i className='fas fa-id-card'></i>
      )}
    </div>
  );

  const isLogout = (
    <div
      className='holder-user-icon'
      onMouseEnter={() => setIsShownRegisterLogin(true)}
      onMouseLeave={() => setIsShownRegisterLogin(false)}
    >
      {isShownRegisterLogin ? (
        <Fragment>
          <i className='fas fa-user-plus' style={{ color: '#5076a0' }}></i>
          <ul
            className='hovered-user-icon'
            onClick={() => setIsShownRegisterLogin(false)}
          >
            <li>
              <NavLink to='/register' exact activeClassName='current'>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' exact activeClassName='current'>
                Login
              </NavLink>
            </li>
          </ul>
        </Fragment>
      ) : (
        <i className='fas fa-user-plus'></i>
      )}
    </div>
  );

  const isCart = (
    <div
      className='holder-cart-icon'
      onMouseEnter={() => setIsCartContentShown(true)}
      onMouseLeave={() => setIsCartContentShown(false)}
    >
      {isCartContentShown ? (
        <Fragment>
          <i className='fas fa-shopping-cart' style={{ color: '#5076a0' }}></i>

          <div className='hovered-cart-icon'>
            <div className='cart-items'>
              {cartProducts.length > 0 ? (
                cartProducts.map((product, index) => (
                  <CartDropdown key={index} product={product} />
                ))
              ) : (
                <span className='cart-empty'>Your cart is empty</span>
              )}
            </div>

            <Button variant='info' type='submit'>
              Checkout
            </Button>
          </div>
        </Fragment>
      ) : (
        <i className='fas fa-shopping-cart'></i>
      )}
    </div>
  );

  return (
    <Fragment>
      <div className='holder-main'>
        <div className='holder-nav'>
          <Nav
            activeKey='/'
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className='nav-parent'
          >
            <div className='nav-home'>
              <Nav.Item>
                <Link to='/'>
                  <i className='fas fa-home'></i>
                </Link>
              </Nav.Item>
            </div>

            <div className='nav-shop'>
              <Nav.Item>
                <Link to='/shop'>
                  <i className='fas fa-store'></i>
                </Link>
              </Nav.Item>
            </div>

            <div className='nav-site'>
              <div className='nav-search'></div>

              {isAuthenticated ? isLogin : isLogout}

              {isCart}
            </div>
          </Nav>
        </div>
      </div>
    </Fragment>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
