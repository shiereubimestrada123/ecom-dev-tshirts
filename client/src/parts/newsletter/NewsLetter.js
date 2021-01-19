import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addMailNewsletter } from '../../store/actions/auth';

const NewsLetter = ({ addMailNewsletter, parentNewsletterCallback }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addMailNewsletter({ email });
    parentNewsletterCallback(email);
    setFormData('');
    e.target.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Row>
      <Col md={12}>
        <div className='mail-parent'>
          <div className='mail-container'>
            <div className='copy-wrapper'>
              <p> SIGN UP FOR OUR NEWSLETTER</p>
            </div>
            <div className='form-wrapper'>
              <form
                className='form-parent-mailing'
                onSubmit={(e) => onSubmit(e)}
              >
                <input
                  type='email'
                  name='email'
                  placeholder='Enter email'
                  onChange={handleChange}
                />
                <button>Go</button>
              </form>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default connect(null, { addMailNewsletter })(NewsLetter);
