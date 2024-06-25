import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    category: '',
    price: '',
    description: '',
    thumbnail: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    description: Yup.string().required('Description is required'),
    thumbnail: Yup.string().required('Image URL is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = {
      title: values.title,
      category: values.category,
      price: values.price,
      description: values.description,
      thumbnail: values.thumbnail,
    };

    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setSubmitting(false);
        resetForm();
        navigate('/category'); 
      })
      .catch(error => {
        console.error('Error adding product:', error);
        setSubmitting(false);
      });
  };

  return (
    <div className="addPformContainer">
      <h2>Add Your Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="formItem">
              <label htmlFor="title">Title</label><br />
              <Field className="values" type="text" name="title" placeholder="Enter Title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="formItem">
              <label htmlFor="category">Category</label><br />
              <Field className="values" type="text" name="category" placeholder="Enter Category" />
              <ErrorMessage name="category" component="div" className="error" />
            </div>

            <div className="formItem">
              <label htmlFor="price">Price</label><br />
              <Field className="values" type="number" name="price" placeholder="Enter Price" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="formItem">
              <label htmlFor="description">Description</label><br />
              <Field className="values" type="text" name="description" placeholder="Enter Description" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            <div className="formItem">
              <label htmlFor="thumbnail">Image URL</label> <br />
              <Field className="values" type="text" name="thumbnail" placeholder="Paste URL of image" />
              <ErrorMessage name="thumbnail" component="div" className="error" />
            </div>

            <button className='butt' type="submit" disabled={isSubmitting}>
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
