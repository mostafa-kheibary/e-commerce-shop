import { AiOutlineDelete } from 'react-icons/ai';
import { useCartContext } from '../../context/Cart/CartContext';
import { IProducts } from '../../types/productsType';
import { Button } from '../';
import './ShopCartItem.css';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  item: IProducts;
}
const ShopCartItem: React.FC<IProps> = ({ item }) => {
  const { deleteFromCart, increaseQuantity, decreaseQuantity } = useCartContext();
  const discountPrice = (item.price - (item.price * item.discountPercent) / 100).toFixed(2);

  return (
    <div className='shop-cart__item'>
      <p className='shop-cart__item-count'>{item.count}</p>
      <div className='shop-cart__item__counter'>
        <Button onClick={() => increaseQuantity(item)} className='shop-cart__item__counter-button secoundry'>
          +
        </Button>
        <Button onClick={() => decreaseQuantity(item)} className='shop-cart__item__counter-button secoundry'>
          -
        </Button>
      </div>
      <button onClick={() => deleteFromCart(item)} className='shop-cart__item-delete-button'>
        <AiOutlineDelete />
      </button>
      <img className='shop-cart__item__image' loading='lazy' src={item.imageUrls[0]} alt={item.name} />
      <div className='shop-cart__item__content'>
        <Link to={`/shop/${item.id}`} className='shop-cart__item__name'>
          {item.name.length >= 30 ? `${item.name.slice(0, 35)} ...` : item.name}
        </Link>
        <p className='shop-cart__item__price'>{discountPrice} $</p>
      </div>
    </div>
  );
};
export default memo(ShopCartItem);
