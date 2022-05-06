import { RiShoppingCart2Line } from 'react-icons/ri';
import './ShopCart.css';
const ShopCart = () => {
  return (
    <div className='cart'>
      <div className='cart-icons'>
        <span className='cart-quantity'>10</span>
        <RiShoppingCart2Line className='cart-icon' />
      </div>
      <span className='cart-price'>00,00$</span>
    </div>
  );
};

export default ShopCart;
