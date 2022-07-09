import { BiGitCompare, BiSearch, BiHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/Cart/CartContext';
import { IProducts } from '../../types/productsType';
import './ProductCard.css';
interface Props {
  productData: IProducts;
}
const ProductCard: React.FC<Props> = ({ productData }) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
  const discountPrice = (productData.price - (productData.price * productData.discountPercent) / 100).toFixed(2);

  const handleOpenProduct = (): void => {
    navigate(`/shop/${productData.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    addToCart(productData, 1);
  };

  return (
    <div onClick={handleOpenProduct} className='product-card'>
      <div className='product-card__discount-percent'>-{productData.discountPercent}%</div>
      <div className='product-card__tools'>
        <button className='product-card__tools-tool'>
          <BiGitCompare size={20} />
          <span className='product-card__tools-tool__info'>compare</span>
        </button>
        <button className='product-card__tools-tool'>
          <BiSearch size={20} />
          <span className='product-card__tools-tool__info'>quick review</span>
        </button>
        <button className='product-card__tools-tool'>
          <BiHeart size={20} />
          <span className='product-card__tools-tool__info'>add to favourite</span>
        </button>
      </div>
      <div className='product-card__image'>
        <img
          className='product-card__image-image'
          loading='lazy'
          src={productData.imageUrls[0]}
          alt={productData.name}
        />
        <button onClick={handleAddToCart} className='add-to-cart'>
          <h2>ADD TO CART</h2>
        </button>
      </div>
      <div className='product-card__content'>
        <h4 className='product-card__name'>{productData.name}</h4>
        <div className='product-card__content__price'>
          <del className='product-card__regular-price'>{productData.price}</del>
          <span className='product-card__discount-price'>{discountPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
