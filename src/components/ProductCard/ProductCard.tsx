import { BiGitCompare, BiSearch, BiHeart } from 'react-icons/bi';
import { useCartContext } from '../../context/Cart/CartContext';
import useLocalStorage from '../../hook/useLocalStorage';
import { IProducts } from '../../types/productsType';
import './ProductCard.css';
interface Props {
  productsData: IProducts;
}
const ProductCard: React.FC<Props> = ({ productsData }) => {
  const { state, dispath } = useCartContext();
  const { setStorage, getStorage } = useLocalStorage();
  const discountPrice = (productsData.price - (productsData.price * productsData.discountPercent) / 100).toFixed(2);

  const handleAddToCart = (): void => {
    if (state.find((product) => product.id === productsData.id)) {
      const product = state.find((product) => product.id === productsData.id);
      product!.count += 1;
      const newState = state.filter((p) => p.id !== product!.id);
      setStorage('SHOP_CART', [...newState, product]);
      dispath({ type: 'SET_CART', payload: [...newState, product] });
    } else {
      productsData.count = 1;
      const cartData = getStorage('SHOP_CART');
      setStorage('SHOP_CART', [...cartData, productsData]);
      dispath({ type: 'ADD_TO_CART', payload: productsData });
    }
  };
  return (
    <div className='product-card'>
      <div className='product-card__discount-percent'>-{productsData.discountPercent}%</div>
      <div className='product-card__tools'>
        <button className='product-card__tools-tool'>
          <BiGitCompare size={20} />
        </button>
        <button className='product-card__tools-tool'>
          <BiSearch size={20} />
        </button>
        <button className='product-card__tools-tool'>
          <BiHeart size={20} />
        </button>
      </div>
      <div className='product-card__image'>
        <img className='product-card__image-image' src={productsData.imageUrls[0]} alt={productsData.name} />
        <button onClick={handleAddToCart} className='add-to-cart'>
          <h2>ADD TO CART</h2>
        </button>
      </div>
      <div className='product-card__content'>
        <h4 className='product-card__name'>{productsData.name}</h4>
        <div className='product-card__content__price'>
          <del className='product-card__regular-price'>{productsData.price}</del>
          <span className='product-card__discount-price'>{discountPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
