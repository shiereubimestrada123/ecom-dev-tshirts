import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import alertPrompt from './alertPrompt';
import category from './category';
import product from './product';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product'],
};

const rootReducer = combineReducers({
  auth,
  alertPrompt,
  category,
  product,
});

export default persistReducer(persistConfig, rootReducer);
