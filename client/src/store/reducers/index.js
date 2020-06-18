import { combineReducers } from 'redux';
import auth from './auth';
import alertPrompt from './alertPrompt';

export default combineReducers({
  auth,
  alertPrompt,
});
