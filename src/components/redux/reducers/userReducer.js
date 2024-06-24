import { SET_USER } from '../actions/userActions';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default userReducer;
