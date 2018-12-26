import { combineReducers } from 'redux';
import productReducer from './products';


module.exports = combineReducers({
  products: productReducer,
})
