import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import list from './list';
import loading from './loading';
import notification from './notifications';
import publicProfile from './public-profile';
import discover from './discover';

export default combineReducers({
  auth,
  error,
  list,
  publicProfile,
  discover,
  loading,
  notification,
});
