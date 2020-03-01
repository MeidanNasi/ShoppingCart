
import {combineReducers} from 'redux';
import items from './itemsReducer';
import cart from './cartReducer';
import auth from './authReducer';


const rootReducer = combineReducers({
  items,
  cart,
  auth
})

export default rootReducer;