import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import list from './list';
import loading from './loading';
import publicProfile from './publicProfile';

export default combineReducers({ auth, error, list, publicProfile, loading });
