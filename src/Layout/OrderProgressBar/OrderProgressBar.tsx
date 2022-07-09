import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderProgressBar.css';
const OrderProgressBar: FC = () => {
  const { pathname } = useLocation();
  const per = pathname.split('/')[1] === 'cart' ? 2 : pathname.split('/')[1] === 'checkout' ? 50 : 0;
  return (
    <div className='order-progress'>
      <div className='order-progress-line' style={{ width: `${per}%` }}></div>
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
