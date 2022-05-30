import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { useCartContext } from '../../context/Cart/CartContext';
import { IProducts } from '../../types/productsType';
import ShopCartItem from '../ShopCartItem/ShopCartItem';
import './ShopCart.css';

const ShopCart: React.FC = () => {
  const { state } = useCartContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`cart-overlay ${isOpen ? 'show' : ''}`}
      ></div>
      <div onClick={() => setIsOpen(!isOpen)} className='cart'>
        <div className='cart-icons'>
          <span className='cart-quantity'>{state.length}</span>
          <MdOutlineShoppingBag className='cart-icon' />
        </div>
        <span className='cart-price'>00,00$</span>
      </div>
      <div className={`cart-wrapper ${isOpen ? 'open' : ''}`}>
        <div className='cart-wrapper__header'>
          <h2 className='cart-title'>Shoping Cart</h2>
        </div>
        <div className='cart-wrapper__body'>
          {state.map((item: IProducts) => (
            <ShopCartItem items={item} />
          ))}
        </div>
        <div className='cart-wrapper__footer'>
          <h2>ssss</h2>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
