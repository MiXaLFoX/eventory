import {applyMiddleware, createStore} from 'redux';
import {reactReduxFirebase, getFirebase} from "react-redux-firebase";
import {reduxFirestore, getFirestore} from "redux-firestore";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import firebase from "../config/firebase";

const reactReduxFirestoreConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

  const composedEnchancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, reactReduxFirestoreConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnchancer);

  return store
};