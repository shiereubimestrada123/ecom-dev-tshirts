import { combineReducers } from 'redux';
import auth from './auth';
import alertPrompt from './alertPrompt';
import category from './category';

export default combineReducers({
  auth,
  alertPrompt,
  category,
});
