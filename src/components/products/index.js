import { useEffect, useState } from "react";
import {getAllProducts, getProductsByCategory, addToCart} from '../apis';
import { Card, List, Image, Typography, Select, message, Button } from "antd";
import { useParams } from "react-router-dom";

import React from 'react'

const Products = () => {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('az');
  const param = useParams();
  useEffect(() => {
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
    });
  }, [param]);



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
        <Typography.Text>View Items Filtered By: </Typography.Text>
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
        return <Card className="itemCard" title={products.title} key={index} 
        cover={<Image className="itemCardImage" src={products.thumbnail} />} 
          actions={[
                  <AddToCartButton item={products} />
                ]}>
           <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${products.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          products.price +
                            (products.price * products.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "See more" }}
                    >
                      {products.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
        </Card>
      }}
      dataSource={getSortedItems()}
      ></List>
    </div>
  )
}

function AddToCartButton({ item }) {
  const addProductToCart = () => {
    addToCart(item.id).then((res) => {
      message.success(`${item.title} added to cart!`);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
    >
      Add to Cart
    </Button>
  );
}

export default Products