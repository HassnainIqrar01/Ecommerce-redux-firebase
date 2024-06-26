import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  order: orderReducer
});

export default rootReducer;
