import React, { useState, useEffect } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { Button } from 'antd';
import { database } from '../../firebase.config';
import Tabs from './tabs';

const Products = () => {
  const [products, setProductsState] = useState([]);
  const [deletedProducts, setDeletedProductsState] = useState([]);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const deletedProductsRef = ref(database, 'deletedProducts');

    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setProductsState(productList);
    });

    onValue(deletedProductsRef, (snapshot) => {
      const data = snapshot.val();
      const deletedProductList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setDeletedProductsState(deletedProductList);
    });
  }, []);

  const deleteProduct = async (product) => {
    const productRef = ref(database, `products/${product.id}`);
    const deletedProductsRef = ref(database, `deletedProducts/${product.id}`);

    try {
      await set(deletedProductsRef, product);
      await remove(productRef);
      setProductsState(prevProducts => prevProducts.filter(p => p.id !== product.id));
      setDeletedProductsState(prevDeletedProducts => [...prevDeletedProducts, product]);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const restoreProduct = async (product) => {
    const deletedProductRef = ref(database, `deletedProducts/${product.id}`);
    const productsRef = ref(database, `products/${product.id}`);

    try {
      await set(productsRef, product);
      await remove(deletedProductRef);
      setDeletedProductsState(prevDeletedProducts => prevDeletedProducts.filter(p => p.id !== product.id));
      setProductsState(prevProducts => [...prevProducts, product]);
    } catch (error) {
      console.error('Error restoring product:', error);
    }
  };

  return (
    <div>
      <Tabs>
        <div label="All Products">
          <div className="productList">
            {products.map(product => (
              <div key={product.id} className="productItem">
                <img src={product.thumbnail} alt={product.title} />
                <p>Name: {product.title}</p>
                <p>Desc: {product.description}</p>
                <p>Price: ${product.price}</p>
               
                <Button
        type="primary"
        className='butt'
        onClick={() => deleteProduct(product)}
      >
        Delete Product
      </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div label="Deleted Products">
          <div className="productList">
            {deletedProducts.map(product => (
              <div key={product.id} className="productItem">
                <img src={product.thumbnail} alt={product.title} />
                <p>Name: {product.title}</p>
                <p>Desc: {product.description}</p>
                <p>Price: ${product.price}</p>
                <Button
        type="primary"
        className='butt'
        onClick={() => restoreProduct(product)}
      >
        Restore Product
      </Button>
              </div>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Products;
