import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { Card, Image, Typography, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../components/redux/actions/cartActions';
import AppFooter from '../components/footer';
import AppHeader from '../components/header';

const searchClient = algoliasearch('WSNWYA47OY', 'df303ef909634aa03083371166f716b4');

const Hit = ({ hit }) => {
  return (
    <Card
      className="itemCard"
      title={hit.title}
      cover={<Image className="itemCardImage" src={hit.thumbnail} />}
      actions={[
        <AddToCartButton item={hit} />
      ]} 
    >
      <Card.Meta
        title={
          <Typography.Paragraph>
            Price: ${hit.price}{" "}
            <Typography.Text delete type="danger">
              ${parseFloat(hit.price + (hit.price * hit.discountPercentage) / 100).toFixed(2)}
            </Typography.Text>
          </Typography.Paragraph>
        }
        description={
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "See more" }}>
            {hit.description}
          </Typography.Paragraph>
        }
      />
    </Card>
  );
};

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

const Search = () => {
  return (
    <>
    <AppHeader />
    <InstantSearch searchClient={searchClient} indexName="prod_Search">
      <SearchBox className="container" />
      <Hits className="content" hitComponent={Hit} />
    </InstantSearch>
    <AppFooter />
    </>
  );
};

export default Search;
