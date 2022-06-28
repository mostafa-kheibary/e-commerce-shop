import { useState } from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { useCartContext } from '../../context/Cart/CartContext';
import { IProducts } from '../../types/productsType';
import { Button } from '../';
import ShopCartItem from '../ShopCartItem/ShopCartItem';
import './ShopCart.css';

const ShopCart: React.FC = () => {
  const { state } = useCartContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const totalPrice = state
    .reduce((prev, item) => (prev += (item.price - (item.price * item.discountPercent) / 100) * item.count), 0)
    .toFixed(2);
  
    return (
    <div>
      <div onClick={() => setIsOpen(false)} className={`cart-overlay ${isOpen ? 'show' : ''}`}></div>
      <div onClick={() => setIsOpen(!isOpen)} className='cart'>
        <div className='cart-icons'>
          <span className='cart-quantity'>{state.reduce((prev, pro) => (prev += pro.count), 0)}</span>
          <MdOutlineShoppingBag className='cart-icon' />
        </div>
        <span className='cart-price'>{totalPrice} $</span>
      </div>
      <div className={`cart-wrapper ${isOpen ? 'open' : ''}`}>
        <div className='cart-wrapper__header'>
          <h2 className='cart-title'>Shoping Cart</h2>
        </div>
        <div className='cart-wrapper__body'>
          {state.map((item: IProducts, i: number) => (
            <ShopCartItem key={i} item={item} />
          ))}
        </div>
        <div className='cart-wrapper__footer'>
          <Button className='cart-wrapper__footer__button'>check out</Button>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
