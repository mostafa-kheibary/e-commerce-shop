import { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { Container } from '../../Layout';
import './Thanks.css';

const Thanks: FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  if (!location.state.inApp || location.state.orderId === undefined) {
    return <Navigate replace to='/' />;
  }

  return (
    <Container className='thanks-page__container'>
      <div className='thanks-page'>
        <h2 className='thanks-page__title'>Thanks for your purchase</h2>
        <p className='thanks-page__discription'>the order will be send to you</p>
      </div>
      <hr className='thanks-page__line' />
      <div className='thanks-page__order'>
        <h4 className='thanks-page__order-title'>your order Id : {location.state.orderId}</h4>
        <p className='thanks-page__order-discription'>you can see your order in profile section</p>
        <Button onClick={() => navigate('/profile/order')}>Go To My Order</Button>
      </div>
    </Container>
  );
};

export default Thanks;
