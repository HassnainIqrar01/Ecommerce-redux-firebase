import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { message, Button } from 'antd';
import { sanitizeEmailForPath } from '../../utils';


export const AddToCartButton=({ item }) => {
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.user.email);
  
    function addProductToCart() {
      dispatch(addToCart(item, sanitizeEmailForPath(userEmail)));
      message.success(`${item.title} added to cart!`);
    };
  
    return (
      <Button type="link" onClick={addProductToCart}>
        Add to Cart
      </Button>
    );
  }
