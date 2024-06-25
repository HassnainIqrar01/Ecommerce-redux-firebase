import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../components/apis';
import { Card, Image, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const productData = await getProductById(id); 
            setProduct(productData);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <Card
                className="productDetailsCard"
                title={product.title}
                cover={<Image className="itemCardImage" src={product.thumbnail} />}
            >
                <Card.Meta
                    title={
               <Paragraph>
                Price: ${product.price}{" "}
               <Text delete type="danger">$
                 {parseFloat(
                 product.price +
                 (product.price * product.discountPercentage) / 100
                 ).toFixed(2)}
             </Text>
              </Paragraph>
                    }
                    description={<Paragraph>{product.description}</Paragraph>}
                />
            </Card>
        </div>
    );
};

export default ProductDetails;
