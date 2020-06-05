import React from 'react';
import { Nav } from 'react-bootstrap';

const NavigationBar = (props) => {
  return (
    <Nav
      activeKey='/home'
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href='/home'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-1'>Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-2'>Login</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link eventKey='disabled' disabled>
          Disabled
        </Nav.Link>
      </Nav.Item> */}
    </Nav>
  );
};

export default NavigationBar;
