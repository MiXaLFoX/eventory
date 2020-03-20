import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export const configureStore = () => {
  const middlewares = [thunk];

  const composedEnchancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, composedEnchancer);

  return store
};