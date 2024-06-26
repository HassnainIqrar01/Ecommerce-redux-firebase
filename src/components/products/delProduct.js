import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase.config';

const DeleteProduct = () => {
  const [deletedProducts, setDeletedProducts] = useState([]);

  const initialValues = {
    id: '',
  };

  const validationSchema = Yup.object({
    id: Yup.number().required('required').positive('Product ID must be positive').integer('Product ID must be integer'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm })=> {
    const productId = values.id;

    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
      
        const deletedProductsRef = ref(database, 'deletedProducts');
        push(deletedProductsRef, product);

      
        setDeletedProducts((prevDeletedProducts) => [...prevDeletedProducts, product]);

        return fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'DELETE',
        });
      })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setSubmitting(false);
        resetForm();
      })
      .catch(error=>{
        console.error('Error deleting product:', error);
        setSubmitting(false);
      });
  };

  const clearDeletedProducts = () => {
    setDeletedProducts([]);
  };

  return (
    <div className="addPformContainer">
      <h2>Delete Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="formItem">
              <label htmlFor="id">Product ID</label><br />
              <Field className="values" type="number" name="id" placeholder="Enter Product ID" />
              <ErrorMessage name="id" component="div" className="error" />
            </div>

            <button className='butt' type="submit" disabled={isSubmitting}>
              Delete Product
            </button>
          </Form>
        )}
      </Formik>
      <button className="butt" onClick={clearDeletedProducts}>
        Clear Deleted Products
      </button>
      {deletedProducts.length > 0 && (
        <div className="deletedProductList">
          <h3>Deleted Products</h3>
          {deletedProducts.map((product, index) => (
            <div key={index} className="deletedProductInfo">
              <img src={product.thumbnail} alt={product.title} />
              <p>Name: {product.title}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
