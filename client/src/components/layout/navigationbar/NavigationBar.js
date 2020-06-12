import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import useHover from '../../../utils/useHover';

const NavigationBar = (props) => {
  const [hoverRef, isHovered] = useHover();
  const [count, setCount] = useState(0);

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
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>

        {isHovered && (
          <ul className='hovered-register-login'>
            <li>
              <button onClick={() => setCount(count + 1)}>Click me</button>
            </li>
            <li>Login</li>
          </ul>
        )}

        <div className='nav-checkout'>
          <i class='fas fa-shopping-cart'></i>
        </div>
      </Nav>
    </Fragment>
  );
};

export default NavigationBar;
