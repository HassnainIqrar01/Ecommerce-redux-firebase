import { useEffect, useState } from "react";
import {getAllProducts, getProductsByCategory} from '../apis';
import { Card, List, Image, Typography, Select, message, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

import React from 'react'

const Products = () => {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const param = useParams();
  useEffect(() => {
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
    });
  }, [param]);

const Text = Typography;

  const getSortedItems=()=> {
    const sortedItems = [...items]
    sortedItems.sort((a,b)=> {
      if (sortOrder === 'az'){
        return a.title > b.title ? 1 : a.title === b.title ? 0:-1
      }
     else if (sortOrder === 'za'){
        return a.title < b.title ? 1 : a.title === b.title ? 0:-1
      }
     else if (sortOrder === 'lowHigh'){
        return a.price > b.price ? 1 : a.price === b.price ? 0:-1
      }
      else if (sortOrder === 'highLow'){
        return a.price < b.price ? 1 : a.price === b.price ? 0:-1
      }
    })
    return sortedItems;
  }

  return (  
  <div className="productsContainer">
   
     <div>
        <Text.Text>View Items Filtered By: </Text.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value)
          }}
          defaultValue={"az"}
          options={[
            {
              label: "Alphabetically a-z",
              value: "az",
            },
            {
              label: "Alphabetically z-a",
              value: "za",
            },
            {
              label: "Price Low to High",
              value: "lowHigh",
            },
            {
              label: "Price High to Low",
              value: "highLow",
            },
          ]}
        ></Select>
      </div>
      <List 
      grid={{column: 3}}
      renderItem={(products, index) => {
        return (
        <Card className="itemCard" title={products.title} key={index} 
        cover={<Image className="itemCardImage" src={products.thumbnail} />} 
          actions={[
                  <AddToCartButton item={products} />,
                  <Link to={`/products/${products.id}`}>View Details</Link>
                ]}>
           <Card.Meta
                  title={
                    <Text.Paragraph>
                      Price: ${products.price}{" "}
                      <Text.Text delete type="danger">
                        $
                        {parseFloat(
                          products.price +
                            (products.price * products.discountPercentage) / 100
                        ).toFixed(2)}
                      </Text.Text>
                    </Text.Paragraph>
                  }
                  description={
                    <Text.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "See more" }}
                    >
                      {products.description}
                    </Text.Paragraph>
                  }
                ></Card.Meta>
        </Card>
        )
      }}
      dataSource={getSortedItems()}
      ></List>
    </div>
  )
}

function AddToCartButton({ item }) {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);

  const addProductToCart = () => {
 
    dispatch(addToCart(item, userEmail));
    message.success(`${item.title} added to cart!`);
  };

  return (
    <Button type="link" onClick={addProductToCart}>
      Add to Cart
    </Button>
  );
}

export default Products