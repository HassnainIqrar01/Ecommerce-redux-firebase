
import { 
  ADD_TO_CART, 
  INCREMENT_QUANTITY, 
  DECREMENT_QUANTITY, 
  REMOVE_FROM_CART, 
  SAVE_CART_TO_FIREBASE, 
  CLEAR_CART, 
  LOAD_CART_FROM_FIREBASE 
} from '../actions/cartActions';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case SAVE_CART_TO_FIREBASE:
      return state; 
      case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
      case LOAD_CART_FROM_FIREBASE:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
