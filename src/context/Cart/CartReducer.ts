import { IProducts } from '../../types/productsType';
interface IAction {
  type: string;
  payload: any;
}
const cartReducer = (state: IProducts[], action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);
    case 'INCRESE_COUNT':
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    case 'DECRESE_COUNT':
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
