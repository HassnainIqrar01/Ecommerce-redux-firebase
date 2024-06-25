import { useEffect, useState } from "react";
import {getAllProducts, getProductsByCategory} from '../apis';
import { Card, List, Image, Typography, Select } from "antd";
import { useParams, Link } from "react-router-dom";
import { AddToCartButton } from "./addToCart";
import React from 'react'

const { Text, Paragraph } = Typography;

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
        <Text>View Items Filtered By: </Text>
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
                    <Paragraph>
                      Price: ${products.price}{" "}
                      <Text delete type="danger">
                        $
                        {parseFloat(
                          products.price +
                            (products.price * products.discountPercentage) / 100
                        ).toFixed(2)}
                      </Text>
                    </Paragraph>
                  }
                  description={
                    <Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "See more" }}
                    >
                      {products.description}
                    </Paragraph>
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

export default Products