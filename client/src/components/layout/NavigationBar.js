import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavigationBar = (props) => {
  return (
    <Nav
      activeKey='/home'
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      className='parent-nav'
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
  );
};

export default NavigationBar;
