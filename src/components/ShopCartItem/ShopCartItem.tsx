import { AiOutlineDelete } from 'react-icons/ai';
import { useCartContext } from '../../context/Cart/CartContext';
import { IProducts } from '../../types/productsType';

import './ShopCartItem.css';

interface IProps {
  item: IProducts;
}
const ShopCartItem: React.FC<IProps> = ({ item }) => {
  const { dispath } = useCartContext();

  const discountPrice = (item.price - (item.price * item.discountPercent) / 100).toFixed(2);

  const handleDelete = (): void => {
    dispath({ type: 'REMOVE_FROM_CART', payload: item.id });
  };

  return (
    <div className='shop-cart__item'>
      <p>{item.count}</p>
      <button onClick={handleDelete} className='shop-cart__item-delete-button'>
        <AiOutlineDelete />
      </button>
      <img className='shop-cart__item__image' src={item.imageUrls[0]} alt={item.name} />
      <div className='shop-cart__item__content'>
        <h2 className='shop-cart__item__name'>{item.name}</h2>
        <p className='shop-cart__item__price'>{discountPrice} $</p>
      </div>
    </div>
  );
};
export default ShopCartItem;
