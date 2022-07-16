import { FC } from 'react';
import './ProductCardLoading.css';

const ProductCardLoading: FC = () => {
  return (
    <div className='shop__skeleton__product'>
      <div className='shop__skeleton__product__image'></div>
      <div className='shop__skeleton__product__name'></div>
      <div className='shop__skeleton__product__price'></div>
    </div>
  );
};

export default ProductCardLoading;
