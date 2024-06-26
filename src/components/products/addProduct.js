import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase.config';
import { Select } from 'antd';

const AddProduct = () => {
  const [products, setProducts] = useState([]);

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

         const productsRef = ref(database, `products/${values.category}`);
        push(productsRef, response);

        setProducts(prevProducts => [...prevProducts, response]);
        setSubmitting(false);
        resetForm();
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
        {({isSubmitting,setFieldValue}) => (
          <Form>
            <div className="formItem">
              <label htmlFor="title">Title</label><br />
              <Field className="values" type="text" name="title" placeholder="Enter Title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="formItem">
              <label htmlFor="category">Category</label><br />
              <Select
                className="values"
                name="category"
                onChange={(value) => setFieldValue('category', value)}
                placeholder="Select Category"
              >
                <Select.Option value="Fragrances">Fragrances</Select.Option>
                <Select.Option value="Electronics">Electronics</Select.Option>
                <Select.Option value="Kitchen">Kitchen</Select.Option>
                <Select.Option value="Clothes">Clothes</Select.Option>
              </Select>
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
              <label htmlFor="thumbnail">Image URL</label><br />
              <Field className="values" type="text" name="thumbnail" placeholder="Paste URL of image" />
              <ErrorMessage name="thumbnail" component="div" className="error" />
            </div>

            <button className="butt" type="submit" disabled={isSubmitting}>
              Add Product
            </button>
          </Form>
        )}
      </Formik>

      {products.length > 0 && (
        <div className="addedProductsList">
          <h3>Added Products</h3>
          {products.map((product, index) => (
            <div key={index} className="addedProductInfo">
              <p><strong>Title:</strong> {product.title}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <img src={product.thumbnail} alt={product.title} className="addedProductImg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
