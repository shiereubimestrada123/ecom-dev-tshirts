import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import useHover from '../../../utils/useHover';

const NavigationBar = (props) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <Fragment>
      <Nav
        activeKey='/home'
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        className='nav-parent'
      >
        <Nav.Item className='nav-left'>
          <Link to='/home' className='home'>
            Home
          </Link>
        </Nav.Item>

        <div className='nav-user' ref={hoverRef}>
          <i className='fas fa-user-plus'></i>
        </div>

        {isHovered ? (
          <ul className='hovered-register-login'>
            <li>Register</li>
            <li>Login</li>
          </ul>
        ) : null}

        <div className='nav-checkout'>
          <i class='fas fa-shopping-cart'></i>
        </div>
      </Nav>
    </Fragment>
  );
};

export default NavigationBar;
