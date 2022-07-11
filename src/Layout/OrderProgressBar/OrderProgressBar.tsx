import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderProgressBar.css';
const OrderProgressBar: FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const percent = path === 'cart' ? 2 : path === 'checkout' ? 50 : path === 'thanks' ? 100 : 0;
  return (
    <div className='order-progress'>
      <div className='order-progress-line' style={{ width: `${percent}%` }}></div>
      <Link to='/cart' className='order-progress__text order-progress-cart'>
        Cart
      </Link>
      <Link to='/checkout' className='order-progress__text order-progress-checkout'>
        Check out
      </Link>
      <Link to='' className='order-progress__text order-progress-finish'>
        Finish
      </Link>
    </div>
  );
};

export default OrderProgressBar;
