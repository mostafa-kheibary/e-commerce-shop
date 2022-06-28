import { IProducts } from '../../types/productsType';
interface IAction {
  type: string;
  payload: any;
}
const cartReducer = (state: IProducts[], action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'ADD_CART_COUNT':
      return action.payload;
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default cartReducer;
