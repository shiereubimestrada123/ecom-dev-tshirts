import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateCategory = (props) => (
  <Form className='my-5'>
    <Form.Group controlId='formCategoryName'>
      <Form.Label>Category Name</Form.Label>
      <Form.Control
        type='name'
        placeholder='Enter category name'
        name='name'
        // value={email}
        // onChange={(e) => onChange(e)}
      />

      <Button variant='info' type='submit' className='my-3'>
        Submit
      </Button>
    </Form.Group>
  </Form>
);

export default CreateCategory;
