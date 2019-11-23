import { createStore, applyMiddleware } from 'redux';
// composeWithDevTools allows you to view the store in the browser
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

// The rootReducer combines the output of multiple
// reducers into a single state tree
import rootReducer from './reducers';

const initialState = {};

// thunk middlelware that extends the store's abilities by
// letting you write async logic that interacts with the store
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
