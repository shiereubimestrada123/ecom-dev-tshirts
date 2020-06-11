import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import MyModal from '../modal/MyModal';

const NavigationBar = (props) => {
  return (
    <Fragment>
      <MyModal />
      <Nav
        activeKey='/home'
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        className='nav-parent'
      >
        <Nav.Item className='nav-left'>
          <Link to='/home'>Home</Link>
        </Nav.Item>
        <div className='nav-right'>
          <Nav.Item>
            <Link to='/register' className='register-nav'>
              Register
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/login'>Login</Link>
          </Nav.Item>
        </div>
      </Nav>
    </Fragment>
  );
};

export default NavigationBar;
