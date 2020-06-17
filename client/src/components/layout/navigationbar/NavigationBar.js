import React, { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, Form } from 'react-bootstrap';
import { logout } from '../../../actions/auth';

const NavigationBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isShownRegisterLogin, setIsShownRegisterLogin] = useState(false);

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

              {!isAuthenticated ? (
                <div
                  className='holder-user-icon'
                  onMouseEnter={() => setIsShownRegisterLogin(true)}
                  onMouseLeave={() => setIsShownRegisterLogin(false)}
                >
                  {!isShownRegisterLogin ? (
                    <i className='fas fa-user-plus'></i>
                  ) : (
                    <i
                      className='fas fa-user-plus'
                      style={{ color: '#5076a0' }}
                    ></i>
                  )}

                  {isShownRegisterLogin && (
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
                  )}
                </div>
              ) : (
                <div
                  className='holder-user-icon'
                  onMouseEnter={() => setIsShownRegisterLogin(true)}
                  onMouseLeave={() => setIsShownRegisterLogin(false)}
                >
                  {!isShownRegisterLogin ? (
                    <i class='fas fa-id-card'></i>
                  ) : (
                    <i class='fas fa-id-card' style={{ color: '#5076a0' }}></i>
                  )}

                  {isShownRegisterLogin && (
                    <ul
                      className='hovered-user-icon'
                      onClick={() => setIsShownRegisterLogin(false)}
                    >
                      <li onClick={logout}>
                        <NavLink to='/home' exact activeClassName='current'>
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              )}

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
