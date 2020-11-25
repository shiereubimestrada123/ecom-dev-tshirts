import React, { Fragment, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Nav, Button, Badge } from 'react-bootstrap';
import { logout } from '../../store/actions/auth';
import {
  selectCartProducts,
  selectCartProductCount,
} from '../../store/selectors/product';
import {
  selectAuthAuthenticated,
  selectAuthUser,
} from '../../store/selectors/auth';
import CartDropdown from '../../components/cartDropdown/CartDropdown';
import FormInput from '../../components/forms/forminput/FormInput';

const NavigationBar = ({
  productCount,
  user,
  isAuthenticated,
  cartProducts,
  logout,
}) => {
  const [isShownRegisterLogin, setIsShownRegisterLogin] = useState(false);
  const [isCartContentShown, setIsCartContentShown] = useState(false);
  const history = useHistory();

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
            className={
              user && user.role === 0
                ? 'hovered-user-icon'
                : 'hovered-admin-icon'
            }
            onClick={() => setIsShownRegisterLogin(false)}
          >
            {user && user.role === 0 ? (
              <Fragment>
                <li>
                  <NavLink to='/user/dashboard' exact activeClassName='current'>
                    User
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to='/user/account' exact activeClassName='current'>
                    My Account
                  </NavLink>
                </li> */}
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <NavLink
                    to='/admin/dashboard'
                    exact
                    activeClassName='current'
                  >
                    Admin
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to='/admin/create/category'
                    exact
                    activeClassName='current'
                  >
                    Create Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/admin/create/product'
                    exact
                    activeClassName='current'
                  >
                    Create Product
                  </NavLink>
                </li> */}
              </Fragment>
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
            className='hovered-not-login-icon'
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
          <div className='parent-badge'>
            <i
              className='fas fa-shopping-cart'
              style={{ color: '#5076a0' }}
            ></i>
            <Badge variant='light' className='total-badge'>
              {productCount}
            </Badge>
          </div>

          <div
            className='hovered-cart-icon'
            onClick={() => setIsCartContentShown(false)}
          >
            <div className='cart-items'>
              {cartProducts.length > 0 ? (
                cartProducts.map((product, index) => (
                  <CartDropdown key={index} product={product} />
                ))
              ) : (
                <span className='cart-empty'>Your cart is empty</span>
              )}
            </div>

            {cartProducts.length > 0 ? (
              <FormInput
                className='btn btn-block cart-btn-cart-dropdown'
                type='submit'
                value='Cart'
                onClick={() => history.push('/cart')}
              />
            ) : (
              <FormInput
                className='btn btn-block shop-btn-cart-dropdown'
                type='submit'
                value='Shop'
                onClick={() => history.push('/shop')}
              />
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='parent-badge'>
            <i className='fas fa-shopping-cart'></i>
            <Badge variant='light' className='total-badge'>
              {productCount}
            </Badge>
          </div>
        </Fragment>
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
};

const mapStateToProps = createStructuredSelector({
  productCount: selectCartProductCount,
  user: selectAuthUser,
  isAuthenticated: selectAuthAuthenticated,
  cartProducts: selectCartProducts,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
