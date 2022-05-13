import { useState } from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import './ShopCart.css';

const ShopCart: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`cart-overlay ${isOpen ? 'show' : ''}`}
      ></div>
      <div onClick={() => setIsOpen(!isOpen)} className='cart'>
        <div className='cart-icons'>
          <span className='cart-quantity'>10</span>
          <MdOutlineShoppingBag className='cart-icon' />
        </div>
        <span className='cart-price'>00,00$</span>
      </div>
      <div className={`cart-wrapper ${isOpen ? 'open' : ''}`}>
        <h2>rjwfg</h2>
      </div>
    </div>
  );
};

export default ShopCart;
