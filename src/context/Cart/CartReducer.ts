import { ICart } from '../../types/productsType';
interface IAction {
  type: string;
  payload: any;
}
const cartReducer = (state: ICart, action: IAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, products: action.payload };
    case 'REMOVE_FROM_CART':
      return { ...state, products: state.products.filter((item) => item.id !== action.payload) };
    case 'INCRESE_COUNT':
      return {
        ...state,
        products: state.products.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    case 'DECRESE_COUNT':
      return {
        ...state,
        products: state.products.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    case 'SET_TOTAL_PRICE':
      return { ...state, totalPrice: action.payload };
    case 'SET_CART':
      return { ...state, products: action.payload };
    case 'CLEAR_CART':
      return { totalPrice: 0, products: [] };
    default:
      return state;
  }
};

export default cartReducer;
