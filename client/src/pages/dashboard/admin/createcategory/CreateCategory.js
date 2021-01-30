import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import { createCategory } from '../../../../store/actions/category';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../store/selectors/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const CreateCategory = ({ createCategory, user, loading }) => {
  let history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    createCategory(name, user && user._id);
    if (name) {
      history.push('/admin/dashboard');
    }
  };

  return (
    <Fragment>
      <AlertPrompt />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Animated
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={true}
          >
            <Row>
              <Col md={12}>
                <section className='holder-create-category'>
                  <div className='parent-create-category'>
                    <div className='category-heading'>
                      <h2>Create Category</h2>
                    </div>
                    <div className='category-body'>
                      <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId='formCategoryName'>
                          <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                              <InputGroup.Text id='basic-addon1'>
                                Name
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type='name'
                              name='name'
                              value={name || ''}
                              onChange={(e) => handleChange(e)}
                            />
                          </InputGroup>

                          <div className='button-holder'>
                            <Link
                              to='/admin/dashboard'
                              className='cancel'
                              style={{ textDecoration: 'none' }}
                            >
                              Cancel
                            </Link>
                            <Button
                              variant='success'
                              className='button'
                              type='submit'
                            >
                              Submit
                            </Button>
                          </div>
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </section>
              </Col>
            </Row>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, { createCategory })(CreateCategory);
