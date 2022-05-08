import { MdOutlineShoppingBag } from 'react-icons/md';
import './ShopCart.css';

const ShopCart: React.FC = () => {
  return (
    <div className='cart'>
      <div className='cart-icons'>
        <span className='cart-quantity'>10</span>
        <MdOutlineShoppingBag className='cart-icon' />
      </div>
      <span className='cart-price'>00,00$</span>
    </div>
  );
};

export default ShopCart;
