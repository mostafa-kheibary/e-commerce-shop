import { Container, ProductSlider } from '../../Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { IProducts } from '../../types/productsType';
import useForm from '../../hook/useForm';
import { TiTick } from 'react-icons/ti';
import { RiCloseFill } from 'react-icons/ri';
import './Product.css';
import { Button, Input, Loader } from '../../components';
import useToast from '../../hook/useToast';
import { useCartContext } from '../../context/Cart/CartContext';

const Product: React.FC = () => {
  const RelatedProduct = useMemo(() => lazy(() => import('../../Layout/RelatedProduct/RelatedProduct')), []);

  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCartContext();
  const [product, setProduct] = useState<IProducts | null>(null);
  const { errorToast } = useToast();

  const handleAddToCart = () => {
    if (+values.quantity >= 1 && product?.inStock) {
      addToCart(product!, +values.quantity);
    } else {
      errorToast('cant add product to cart', 'make sure put number in quantity input');
    }
  };

  useEffect(() => {
    try {
      window.scroll(0, 0);
      const fethProduct = async () => {
        setProduct(null);
        const docRef = doc(db, 'products', `${id}`);
        const data = await getDoc(docRef);
        if (!data.exists()) {
          navigate('/shop');
          errorToast('product not found', 'make sure enter correct product id in url');
        }
        const productData: any = data.data();
        setProduct(productData);
      };
      fethProduct();
    } catch (error) {
      errorToast('cant get data from server', 'make sure you have accses to internet ');
      console.log(error);
    }
  }, [id]);

  const { handleChange, handleSubmit, values } = useForm(handleAddToCart, { quantity: 1 });
  if (!product) {
    return (
      <Container>
        <div className='product-skeleton-loading'>
          <section className='product-skeleton-loading__left'>
            <div className='product-skeleton-loading__left__image'></div>
          </section>
          <section className='product-skeleton-loading__right'>
            <div className='product-skeleton-loading__right__title'></div>
            <div className='product-skeleton-loading__right__date'></div>
            <div className='product-skeleton-loading__right__price'></div>
            <section className='product-skeleton-loading__right__buy'>
              <div className='product-skeleton-loading__right__buy__text'></div>
              <div className='product-skeleton-loading__right__buy__button'></div>
            </section>
            <section className='product-skeleton-loading__right__buy'>
              <div className='product-skeleton-loading__right__buy__text'></div>
              <div className='product-skeleton-loading__right__buy__button'></div>
            </section>
            <div className='product-skeleton-loading__paragraph'></div>
          </section>
        </div>
        <div className='product-skeleton-loading non-flex'>
          <div className='product-skeleton-loading__dis-title'></div>
          <div className='product-skeleton-loading__dis-text'></div>
        </div>
      </Container>
    );
  }
  const discountPrice = (product!.price - (product!.price * product!.discountPercent) / 100).toFixed(2);
  const isAddToCart = cart.find((item) => item.id === product.id) ? true : false;
  return (
    <Container>
      <div className='product-page__path'>
        <Link className='product-page__path-link' to='/'>
          Home
        </Link>{' '}
        /{' '}
        <Link className='product-page__path-link' to='/shop'>
          Shop
        </Link>{' '}
        / {product.name}
      </div>
      <div className='product-page'>
        <div className='product-page__image'>
          <ProductSlider images={product.imageUrls} />
        </div>
        <div className='product-page__content'>
          <h2 className='product-page__content__title'>{product.name}</h2>
          <span className='product-page__content__date'>
            {new Timestamp(product.timeStamp.seconds, product.timeStamp.nanoseconds).toDate().toDateString()}
          </span>

          <div className='product-page__content__prices'>
            {product.discountPercent > 0 && (
              <del className='product-page__content__non-discount-price'>$ {product.price}</del>
            )}
            <h4 className='product-page__content__price'>$ {discountPrice}</h4>
          </div>
          <hr className='product-page__line' />
          <div className='product-page__status'>
            <h4 className='product-page__status__stock'>
              <span style={{ color: '#0000009d' }}>Availability :</span>{' '}
              {product.inStock ? (
                <span className='product-page__status__stock-text'>
                  in stock <TiTick className='product-page__status__stock-icon' />
                </span>
              ) : (
                <span className='product-page__status__stock-text'>
                  out of stock <RiCloseFill className='product-page__status__out-stock-icon' />
                </span>
              )}
            </h4>
            <h4 className='product-page__status-text'>Imported from USA store</h4>
          </div>
          <hr className='product-page__line' />
          <form className='product-page__buy-section' onSubmit={handleSubmit}>
            <div className='product-page__buy-section__input'>
              <h4>Quantity :</h4>
              <Input min={1} max={50} onChange={handleChange} value={values.quantity} name='quantity' type='number' />
            </div>
            <Button disabled={!product.inStock || isAddToCart} type='submit'>
              {isAddToCart ? 'YOU ALREADY ADD THIS' : 'ADD TO CART'}
            </Button>
          </form>
          <p className='product-page__warn-message'>
            Note: Electronic products sold in US store operate on (110-120) volts, a step-down power converter is
            required for the smooth device function. It is mandatory to know the wattage of the device in order to
            choose the appropriate power converter. Recommended power converters
          </p>
        </div>
      </div>
      <hr className='product-page__line' />
      <div className='product-page__discription'>
        <h4 className='product-page__discription__title'>discription</h4>
        <p className='product-page__discription__text'>{product.description}</p>
        <ul className='product-page__discription__features'>
          {product.features.map((feature, i) => (
            <li key={i} className='product-page__discription__feature'>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <hr className='product-page__line' />
      <div className='product-page__sugested-product'>
        <h4 className='product-page__sugested-product__title'>related producs</h4>
        <Suspense fallback={<Loader />}>
          <RelatedProduct catagory={product.catagory} currentProductId={product.id} />
        </Suspense>
      </div>
    </Container>
  );
};

export default Product;
