import React, { createContext, Reducer, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../../hook/useLocalStorage';
import { IProducts } from '../../types/productsType';
import { useInvoiceContext } from '../Invoice/InvoiceContext';
import cartReducer from './CartReducer';
import coponData from '../../data/copon.json';

const initialState: IProducts[] = [];
const CartContext = createContext<any>(initialState);

interface IProps {
  children: React.ReactNode;
}
const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer<Reducer<IProducts[], any>>(cartReducer, initialState);
  const { state: invoice, setInvoice } = useInvoiceContext();
  const { getStorage, setStorage } = useLocalStorage();

  const addToCart = (productData: IProducts, quantity: number = 1): void => {
    // add count to the new product and set it to 1 as default
    if (state.find((product) => product.id === productData.id)) {
      const product = state.find((product) => product.id === productData.id);
      product!.quantity += quantity;
      const newState = state.filter((p) => p.id !== product!.id);
      setStorage('SHOP_CART', [...newState, product]);
      dispath({ type: 'SET_CART', payload: [...newState, product] });
    } else {
      // if allready have count and added to cart, add one to count
      productData.quantity = quantity;
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
    const newProducts = state.map((item) => {
      if (item.id === item.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setStorage('SHOP_CART', newProducts);
  };

  const decreaseQuantity = (item: IProducts): void => {
    dispath({ type: 'DECRESE_COUNT', payload: item.id });
    const newProducts = state.map((item) => {
      if (item.id === item.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setStorage('SHOP_CART', newProducts);
    if (item.quantity <= 1) {
      deleteFromCart(item);
    }
  };
  useEffect(() => {
    const localCopon = getStorage('DISCOUNT_COPON');
    let totalPrice: any = state
      .reduce((prev, item) => (prev += (item.price - (item.price * item.discountPercent) / 100) * item.quantity), 0)
      .toFixed(2);
    if (localCopon.percent > 0) {
      for (const cop in coponData) {
        if (cop === localCopon.text) {
          const discount: any = ((totalPrice * localCopon.percent) / 100).toFixed(2);
          totalPrice = (+totalPrice - +discount).toFixed(2);
        }
      }
    }
    setInvoice({ ...invoice, products: state, totalPrice: +totalPrice });
  }, [state]);

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
