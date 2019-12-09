import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import list from './list';
import loading from './loading';

export default combineReducers({ auth, error, list, loading });
