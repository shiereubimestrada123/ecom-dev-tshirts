import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

const CreateProduct = (props) => {
  return (
    <Fragment>
      {/* <AlertPrompt /> */}
      <Form className='my-5'>
        <Form.Group>
          <Form.File id='photo' label='Photo' />
        </Form.Group>
        <Form.Group controlId='formCategoryName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Name'
            name='name'
            // value={name}
            // onChange={(e) => onChange(e)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='description'
            placeholder='Description'
            name='description'
            // value={name}
            // onChange={(e) => onChange(e)}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='price'
            placeholder='Price'
            name='price'
            // value={name}
            // onChange={(e) => onChange(e)}
          />
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control as='select'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='shipping'>
            <Form.Label>Shipping</Form.Label>
            <Form.Control as='select'>
              <option>True</option>
              <option>False</option>
            </Form.Control>
          </Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type='quantity'
            placeholder='Quantity'
            name='quantity'
            // value={name}
            // onChange={(e) => onChange(e)}
          />

          <Button variant='info' type='submit' className='my-3'>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

CreateProduct.propTypes = {};

export default CreateProduct;
