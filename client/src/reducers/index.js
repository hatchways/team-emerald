import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import list from './list';
import loading from './loading';
import publicProfile from './publicProfile';
import people from './people';

export default combineReducers({
  auth,
  error,
  list,
  publicProfile,
  people,
  loading,
});
