import { FC, useEffect } from 'react';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { Button, Input } from '../../components';
import { useCartContext } from '../../context/Cart/CartContext';
import { useInvoiceContext } from '../../context/Invoice/InvoiceContext';
import { useUserContext } from '../../context/User/UserContext';
import useAuth from '../../hook/useAuth';
import useForm from '../../hook/useForm';
import useToast from '../../hook/useToast';
import { Container } from '../../Layout';
import './CheckOut.css';
import { db } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hook/useLocalStorage';

const CheckOut: FC = () => {
  const { isAuth, loading } = useAuth();
  const { state: cart, clearCart } = useCartContext();
  const { state: invoice, setInvoice } = useInvoiceContext();
  const { setStorage } = useLocalStorage();
  const navigate = useNavigate();
  const { errorToast } = useToast();
  const {
    state: { user },
  } = useUserContext();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        errorToast('you are not login', 'please log in to your account to continue');
      }
    }
  }, [loading, isAuth]);
  const handleOrder = async () => {
    if (isAuth) {
      if (cart.length > 0) {
        try {
          const orderId = Date.now().toString(36) + Math.random().toString(36).substr(2);
          const invoiceData: any = { ...invoice, ...values, userUid: user.uid, orderId, timeStamp: Timestamp.now() };
          setInvoice(invoiceData);
          const docRef = doc(db, 'users', user.uid);
          await updateDoc(docRef, {
            purchuses: arrayUnion(invoiceData),
          });
          clearCart();
          setStorage('DISCOUNT_COPON', { text: '', percent: 0 });
          navigate('/thanks', { state: { inApp: true }, replace: true });
        } catch (error) {
          errorToast('cant place your order', 'make sure that put evrything right');
        }
      }
    } else {
      errorToast('you are not login', 'please log in to your account to continue');
    }
  };
  const { handleChange, handleSubmit, values } = useForm(handleOrder);
  return (
    <Container>
      <h2 className='checkout__title'>Check Out</h2>
      <div className='checkout'>
        <div className='checkout__left'>
          <h3 className='checkout__left__title'>Address details</h3>
          <p className='checkout__left__discription'>
            please fill the form below to order it,however you are not realy buy it{' '}
          </p>
          <form onSubmit={handleSubmit} className='checkout__left__inputs'>
            <div className='checkout__left__inputs__two-coloum'>
              <Input
                required
                onChange={handleChange}
                name='firstName'
                value={values.firstName}
                className='checkout__left__input'
                placeholder='First Name'
              />
              <Input
                required
                onChange={handleChange}
                value={values.secoundName}
                name='secoundName'
                className='checkout__left__input'
                placeholder='Secound Name'
              />
            </div>
            <Input
              required
              onChange={handleChange}
              name='address'
              value={values.address}
              className='checkout__left__input'
              placeholder='Street Address'
            />
            <div className='checkout__left__inputs__two-coloum'>
              <Input
                required
                value={values.city}
                name='city'
                onChange={handleChange}
                className='checkout__left__input'
                placeholder='City'
              />
              <Input
                required
                value={values.zipCode}
                name='zipCode'
                onChange={handleChange}
                className='checkout__left__input'
                placeholder='Zip Code'
              />
            </div>
            <Input
              required
              value={values.phoneNumber}
              name='phoneNumber'
              onChange={handleChange}
              className='checkout__left__input-short'
              placeholder='Phone Number'
            />
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
            <hr className='checkout__right__line' />
            <h4 className='checkout__right__subtotal'>
              Subtotal ({cart.reduce((prev, product) => (prev += product.quantity), 0)})
            </h4>
            <h4 className='checkout__right__totalPrice'>Toatal Order : {invoice.totalPrice} $</h4>
            <Button
              onClick={handleOrder}
              disabled={!isAuth || cart.length <= 0}
              className='checkout__left__inputs__button'
            >
              Order
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckOut;
