import React, { createContext, Reducer, useContext, useReducer } from 'react';
import useLocalStorage from '../../hook/useLocalStorage';
import { IProducts } from '../../types/productsType';
import cartReducer from './CartReducer';

const initialState: IProducts[] = [];
const CartContext = createContext<any>(initialState);

interface IProps {
  children: React.ReactNode;
}
const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer<Reducer<IProducts[], any>>(cartReducer, initialState);
  const { getStorage, setStorage } = useLocalStorage();

  const addToCart = (productData: IProducts, quantity: number = 1): void => {
    // add count to the new product and set it to 1 as default
    if (state.find((product) => product.id === productData.id)) {
      const product = state.find((product) => product.id === productData.id);
      product!.count += quantity;
      const newState = state.filter((p) => p.id !== product!.id);
      setStorage('SHOP_CART', [...newState, product]);
      dispath({ type: 'SET_CART', payload: [...newState, product] });
    } else {
      // if allready have count and added to cart, add one to count
      productData.count = quantity;
      const cartData = getStorage('SHOP_CART');
      setStorage('SHOP_CART', [...cartData, productData]);
      dispath({ type: 'ADD_TO_CART', payload: productData });
    }
  };

  const deleteFromCart = (item: IProducts): void => {
    dispath({ type: 'REMOVE_FROM_CART', payload: item.id });
    // delete from local storage
    const cartCopy = [...state];
    const filterdCart = cartCopy.filter((product) => product.id !== item.id);
    setStorage('SHOP_CART', filterdCart);
  };

  const increaseQuantity = (item: IProducts): void => {
    dispath({ type: 'INCRESE_COUNT', payload: item.id });
  };

  const decreaseQuantity = (item: IProducts): void => {
    dispath({ type: 'DECRESE_COUNT', payload: item.id });
    if (item.count <= 1) {
      deleteFromCart(item);
    }
  };
  return (
    <CartContext.Provider value={{ state, dispath, addToCart, deleteFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

interface IReducer {
  state: IProducts[];
  dispath: ({ type, payload }: { type: string; payload: any }) => void;
  addToCart: (productData: IProducts, quantity: number) => void;
  deleteFromCart: (item: IProducts) => void;
  increaseQuantity: (item: IProducts) => void;
  decreaseQuantity: (item: IProducts) => void;
}
const useCartContext = (): IReducer => useContext(CartContext);

export default CartContext;
export { CartContextProvider, useCartContext };
