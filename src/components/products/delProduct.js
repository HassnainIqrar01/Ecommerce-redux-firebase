import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

const DeleteProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    id: '',
  };

  const validationSchema = Yup.object({
    id: Yup.number().required('required').positive('Product ID must be positive').integer('Product ID must be integer'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm })=> {
    const productId = values.id;

    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setSubmitting(false);
        resetForm();
        navigate('/category'); 
      })
      .catch(error=> {
        console.error('Error deleting product:', error);
        setSubmitting(false);
      });
  };

  return (
    <div className="addPformContainer">
      <h2>Delete Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <div className="formItem">
              <label htmlFor="id">Product ID</label><br />
              <Field className="values" type="number" name="id" placeholder="Enter Product ID"/>
              <ErrorMessage name="id" component="div" className="error" />
            </div>
            <button className='butt' type="submit" disabled={isSubmitting}>
              Delete Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeleteProduct;
