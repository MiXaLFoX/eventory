import {createReducer} from "../../app/common/reducerUtils";
import {LOGIN_USER, SIGN_OUT_USER} from "./auyhConstants";

const initialState = {
  authenticated: false,
  currentUser: null
};

const loginUser = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.credentials.email
  }
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null
  }
};

export default createReducer (initialState, {
  [LOGIN_USER]: loginUser,
  [SIGN_OUT_USER]: signOutUser
})
