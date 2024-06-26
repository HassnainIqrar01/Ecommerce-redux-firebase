import { ref, set, push } from "firebase/database";
import { database } from '../../../firebase.config';
import { sanitizeEmailForPath } from '../../../utils';
import { clearCart } from './cartActions';

export const ADD_ORDER = 'ADD_ORDER';
export const LOAD_ORDERS_FROM_FIREBASE = 'LOAD_ORDERS_FROM_FIREBASE';

export const addOrder = (order, userEmail) => async (dispatch) => {
  const sanitizedEmail = sanitizeEmailForPath(userEmail);
  const ordersRef = ref(database, `orders/${sanitizedEmail}`);
  
  try {
    const newOrderRef = push(ordersRef);
    await set(newOrderRef, order);
    dispatch({ type: ADD_ORDER, payload: order });
    dispatch(clearCart());
  } 
  catch (error) {
    console.error('Error adding order to Firebase', error);
  }
};

export const loadOrdersFromFirebase = (userEmail) => async (dispatch) => {
    const sanitizedEmail = sanitizeEmailForPath(userEmail);
    const ordersRef = ref(database, `orders/${sanitizedEmail}`);
  
    try {
      const snapshot = await get(ordersRef);
      if (snapshot.exists()) {
        const orders = snapshot.val();
        dispatch({ type: LOAD_ORDERS_FROM_FIREBASE, payload: Object.values(orders) });
      } else {
        console.log('No orders data found');
      }
    } catch (error) {
      console.error('Error loading orders from Firebase', error);
    }
  };