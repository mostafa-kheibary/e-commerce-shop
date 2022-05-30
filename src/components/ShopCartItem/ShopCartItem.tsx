import { IProducts } from '../../types/productsType';
import './ShopCartItem.css';

interface IProps {
  items: IProducts;
}
const ShopCartItem: React.FC<IProps> = ({ items }) => {
  return (
    <div className='shop-cart__item'>
      <img className='shop-cart__item__image' src={items.imageUrls[0]} alt={items.name} />
      <div className='shop-cart__item__content'>
        <h2 className='shop-cart__item__name'>{items.name}</h2>
        <p className='shop-cart__item__price'>{items.price}</p>
      </div>
    </div>
  );
};
export default ShopCartItem;
