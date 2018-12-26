import { PRODUCT_LIST } from '../constants';
const initialState: State = { listOfProducts: {}};
function products(state: State = initialState, action: Action): State {
  switch(action.type) {
    case PRODUCT_LIST:
      return { ...state, listOfProducts: action.listOfProducts};
  default:
    return state;
  }
}

module.exports = products;
