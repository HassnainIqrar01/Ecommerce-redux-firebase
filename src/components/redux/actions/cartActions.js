import { ref, set, get } from "firebase/database";
import { database } from '../../../firebase.config'; 
import { sanitizeEmailForPath } from '../../../utils';

export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SAVE_CART_TO_FIREBASE = 'SAVE_CART_TO_FIREBASE';
export const CLEAR_CART = 'CLEAR_CART';
export const LOAD_CART_FROM_FIREBASE = 'LOAD_CART_FROM_FIREBASE';

export const loadCartFromFirebase = (userEmail) => async (dispatch) => {
  if (!userEmail) {
    console.error('User email is not available');
    return;
  }
  const sanitizedEmail = sanitizeEmailForPath(userEmail);
        const cartRef = ref(database, `carts/${sanitizedEmail}`);

  try {
    const snapshot = await get(cartRef);
    if (snapshot.exists()) {
      const cartItems = snapshot.val();
      dispatch({ type: LOAD_CART_FROM_FIREBASE, payload: cartItems });
    } else {
      console.log('No cart data found');
    }
  } catch (error) {
    console.error('Error loading cart from Firebase', error);
  }
};

export const clearCart = () => ({
  type: CLEAR_CART,
});


export const addToCart = (item, userEmail) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: item });
  dispatch(saveCartToFirebase(sanitizeEmailForPath(userEmail)));
};

export const incrementQuantity = (itemId, userEmail) => (dispatch) => {
  dispatch({ type: INCREMENT_QUANTITY, payload: itemId });
  dispatch(saveCartToFirebase(sanitizeEmailForPath(userEmail)));
};

export const decrementQuantity = (itemId, userEmail) => (dispatch) => {
  dispatch({ type: DECREMENT_QUANTITY, payload: itemId });
  dispatch(saveCartToFirebase(sanitizeEmailForPath(userEmail)));
};

export const removeFromCart = (itemId, userEmail) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  dispatch(saveCartToFirebase(sanitizeEmailForPath(userEmail)));
};


export const saveCartToFirebase = (userEmail) => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  const sanitizedEmail = sanitizeEmailForPath(userEmail);
  const cartRef = ref(database, `carts/${sanitizedEmail}`);

  set(cartRef, cartItems)
    .then(() => {
      console.log('Cart saved to Firebase');
      dispatch({ type: SAVE_CART_TO_FIREBASE, payload: cartItems });
    })
    .catch((error) => {
      console.error('Error saving cart to Firebase', error);
    });
};
