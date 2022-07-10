import { FC, useEffect } from 'react';
import { Button, Input } from '../../components';
import { useCartContext } from '../../context/Cart/CartContext';
import { useInvoiceContext } from '../../context/Invoice/InvoiceContext';
import { useUserContext } from '../../context/User/UserContext';
import useAuth from '../../hook/useAuth';
import useToast from '../../hook/useToast';
import { Container } from '../../Layout';
import './CheckOut.css';

const CheckOut: FC = () => {
  const { isAuth, loading } = useAuth();
  const { state: cart } = useCartContext();
  const { state: invoice, setInvoice } = useInvoiceContext();
  const {
    state: { user },
  } = useUserContext();

  const { errorToast } = useToast();
  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        errorToast('you are not login', 'please log in to your account to continue');
      }
    }
  }, [loading, isAuth]);

  return (
    <Container>
      <h2 className='checkout__title'>Check Out</h2>
      <div className='checkout'>
        <div className='checkout__left'>
          <h3 className='checkout__left__title'>Address details</h3>
          <p className='checkout__left__discription'>if you are login some input will automaticly fill for you</p>
          <form className='checkout__left__inputs'>
            <div className='checkout__left__inputs__two-coloum'>
              <Input className='checkout__left__input' placeholder='First Name' />
              <Input className='checkout__left__input' placeholder='Secound Name' />
            </div>
            <Input className='checkout__left__input' placeholder='Street Address' />
            <div className='checkout__left__inputs__two-coloum'>
              <Input className='checkout__left__input' placeholder='City' />
              <Input className='checkout__left__input' placeholder='Zip Code' />
            </div>
            <Input className='checkout__left__input-short' placeholder='Phone Number' />
            <Button className='checkout__left__inputs__button'>Order</Button>
          </form>
        </div>
        <div className='checkout__right'>
          <h4 className='checkout__right__title'>order summery</h4>
          <div className='checkout__right__box'>
            <div className='checkout__right__box__products'>
              {cart.map((product, i) => (
                <div key={i} className='checkout__right__product'>
                  <img className='checkout__right__product-image' src={product.imageUrls[0]} alt={product.name} />
                  <div className='checkout__right__product__ditails'>
                    <h4 className='checkout__right__product__name'>
                      {product.name.length >= 32 ? `${product.name.slice(0, 35)} ...` : product.name}
                    </h4>
                    <h5 className='checkout__right__product__price'>
                      {(product.price - (product.price * product.discountPercent) / 100).toFixed(2)}
                    </h5>
                  </div>
                  <h5>{product.quantity}</h5>
                </div>
              ))}
            </div>
            <hr />
            <h4>Subtotal ({cart.reduce((prev, product) => (prev += product.quantity), 0)})</h4>
            <h4>{invoice.totalPrice}</h4>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckOut;
