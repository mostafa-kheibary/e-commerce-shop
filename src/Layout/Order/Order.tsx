import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Cart, CheckOut } from '../../page';
import OrderProgressBar from '../OrderProgressBar/OrderProgressBar';
import './Order.css';

const Order: FC = () => {
  const { pathname } = useLocation();
  const pathLoc = pathname.split('/')[1];
  return (
    <div className='order'>
      <OrderProgressBar />
      {pathLoc === 'cart' ? <Cart /> : pathLoc === 'checkout' ? <CheckOut /> : ''}
    </div>
  );
};

export default Order;
