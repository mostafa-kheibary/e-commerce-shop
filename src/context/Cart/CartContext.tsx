import React, { createContext, Reducer, useContext, useReducer } from 'react';
import { IProducts } from '../../types/productsType';
import cartReducer from './CartReducer';

const initialState: IProducts[] = [];
const CartContext = createContext<any>(initialState);

interface IProps {
  children: React.ReactNode;
}
const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer<Reducer<IProducts[], any>>(
    cartReducer,
    initialState
  );
  return (
    <CartContext.Provider value={{ state, dispath }}>
      {children}
    </CartContext.Provider>
  );
};

interface IReducer {
  state: IProducts[];
  dispath: (action: any) => void;
}
const useCartContext = (): IReducer => useContext(CartContext);

export default CartContext;
export { CartContextProvider, useCartContext };
