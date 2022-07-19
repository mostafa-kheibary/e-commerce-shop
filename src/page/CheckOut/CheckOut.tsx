import { FC, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { useCartContext } from '../../context/Cart/CartContext';
import { useUserContext } from '../../context/User/UserContext';
import useAuth from '../../hook/useAuth';
import useForm from '../../hook/useForm';
import useToast from '../../hook/useToast';
import { Container } from '../../Layout';
import { db } from '../../config/firebase.config';
import useLocalStorage from '../../hook/useLocalStorage';
import { useLoader } from '../../context/Loader/LoaderContext';
import './CheckOut.css';

const CheckOut: FC = () => {
  const { isAuth, loading } = useAuth();
  const { cart, totalPrice, clearCart } = useCartContext();
  const {
    state: { user },
  } = useUserContext();
  const { setStorage } = useLocalStorage();
  const { setLoader } = useLoader();
  const navigate = useNavigate();
  const { errorToast } = useToast();

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
          setLoader(true);
          const orderId = Date.now().toString(36) + Math.random().toString(36).substr(2);
          const invoiceData: any = {
            orderId,
            products: cart,
            totalPrice,
            orderInfo: { ...values },
            timeStamp: Timestamp.now(),
            userRef: doc(db, 'users', user.uid),
          };
          await setDoc(doc(db, 'purchuses', orderId), invoiceData);
          setLoader(false);
          clearCart();
          setStorage('DISCOUNT_COPON', { text: '', percent: 0 });
          navigate('/thanks', { state: { inApp: true, orderId } });
        } catch (error) {
          setLoader(false);
          errorToast('cant place your order', 'make sure that put evrything right');
        }
      }
    } else {
      setLoader(false);
      errorToast('you are not login', 'please log in to your account to continue');
    }
  };

  const { handleChange, handleSubmit, values } = useForm(handleOrder, {
    firstName: '',
    secoundName: '',
    address: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
  });

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
                type='number'
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
              type='number'
              value={values.phoneNumber}
              name='phoneNumber'
              onChange={handleChange}
              className='checkout__left__input-short'
              placeholder='Phone Number'
            />
            <Button type='submit' className='checkout__left__inputs__button'>
              Order
            </Button>
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
                  <h5 className='checkout__right__product__quantity'>{product.quantity}</h5>
                </div>
              ))}
            </div>
            <hr className='checkout__right__line' />
            <h4 className='checkout__right__subtotal'>
              Subtotal ({cart.reduce((prev, product) => (prev += product.quantity), 0)})
            </h4>
            <h4 className='checkout__right__totalPrice'>Toatal Order : {totalPrice} $</h4>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckOut;
