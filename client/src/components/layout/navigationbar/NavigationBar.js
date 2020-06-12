import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Form } from 'react-bootstrap';

const NavigationBar = (props) => {
  const [count, setCount] = useState(0);
  const [isShown, setIsShown] = useState(false);

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

              <div className='holder-user-icon'>
                <i className='fas fa-user-plus'></i>
              </div>

              <div className='holder-cart-icon'>
                <i className='fas fa-shopping-cart'></i>
              </div>
            </div>

            {/* <div>
              <div
                className='holder-user'
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              ></div>
            </div>

            {isShown && (
              <ul className='hovered-register-login'>
                <li>Register</li>
                <li>Login</li>
              </ul>
            )} */}

            {/* <div className='nav-checkout'>
            <i className='fas fa-shopping-cart'></i>
          </div> */}
          </Nav>
        </div>
      </div>
    </Fragment>
  );
};

export default NavigationBar;
