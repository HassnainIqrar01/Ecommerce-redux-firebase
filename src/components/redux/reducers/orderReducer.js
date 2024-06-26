import { ADD_ORDER, LOAD_ORDERS_FROM_FIREBASE} from '../actions/orderActions';

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
      case LOAD_ORDERS_FROM_FIREBASE:
        return {
          ...state,
          orders: action.payload,
        };
    default:
      return state;
  }
};

export default orderReducer;
