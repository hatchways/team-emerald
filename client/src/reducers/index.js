import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import loading from './loading';

export default combineReducers({ auth, error, loading });
