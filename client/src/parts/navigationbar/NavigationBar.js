import React, { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, Form } from 'react-bootstrap';
import { logout } from '../../store/actions/auth';

const NavigationBar = ({
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const [isShownRegisterLogin, setIsShownRegisterLogin] = useState(false);

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
                  User Dashboard
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to='/admin/dashboard' exact activeClassName='current'>
                  Admin Dashboard
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

  return (
    <Fragment>
      <div className='holder-main'>
        <div className='holder-nav'>
          <Nav
            activeKey='/home'
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className='nav-parent'
          >
            <div className='nav-home'>
              <Nav.Item>
                <Link to='/home'>Home</Link>
              </Nav.Item>
            </div>

            <div className='nav-site'>
              <div className='nav-search'>
                <Form.Group controlId='search' className='search-form'>
                  <Form.Control
                    type='text'
                    placeholder='Search'
                    className='search-input'
                  />
                </Form.Group>
              </div>

              {isAuthenticated ? isLogin : isLogout}

              <div className='holder-cart-icon'>
                <i className='fas fa-shopping-cart'></i>
              </div>
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
});

export default connect(mapStateToProps, { logout })(NavigationBar);
