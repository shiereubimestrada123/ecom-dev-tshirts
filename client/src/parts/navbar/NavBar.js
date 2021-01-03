import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';

const NavBar = (props) => {
  return (
    <div>
      <Navbar bg='light' expand='lg' className='nav2-parent'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav2-child'>
            <Nav.Link href='#home' className='home'>
              Home
            </Nav.Link>
            <Nav.Link href='#shop' className='shop'>
              Shop
            </Nav.Link>
            <Nav.Link href='#cart' className='cart'>
              Cart
            </Nav.Link>
            <Nav.Link href='#login' className='login'>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {};

export default NavBar;
