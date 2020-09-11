import React from 'react';

const Footer = (props) => {
  return (
    <footer className='flex-rw'>
      <ul className='footer-list-top'>
        <li>
          <h4 className='footer-list-header'>Disclaimer</h4>
        </li>
        <li>
          <span className='footer-list'>
            1. This website was created solely for practice only.
          </span>
        </li>
        <li>
          <span className='footer-list'>
            2. Materials such as images you will see is not owned by the creator
            of this website.
          </span>
        </li>
      </ul>
      <ul className='footer-list-top'>
        <li>
          <h4 className='footer-list-header'>EcomDev Inc.</h4>
        </li>

        <li className='footer-list'>
          <i class='fas fa-envelope-square'></i> <span>asdasdasds</span>
        </li>
        <li className='footer-list'>
          <i class='fas fa-map-marker-alt'></i> <span>1231231312</span>
        </li>
      </ul>

      <section className='footer-bottom-section flex-rw'>
        <div className='footer-bottom-wrapper'>
          <i className='fa fa-copyright' role='copyright'></i> 2020 Pavilion in{' '}
          <address className='footer-address' role='company address'>
            Bergen, NY
          </address>
          <span className='footer-bottom-rights'>
            {' '}
            - All Rights Reserved -{' '}
          </span>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
