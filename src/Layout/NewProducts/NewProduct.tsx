import './NewProduct.css';
const NewProduct: React.FC = () => {
  return (
    <div className='new-product'>
      <div className='new-product__head-title'>
        <span className='head-title__notic'>Hurry up to buy</span>
        <h2 className='head-title__main'>New Arrivals</h2>
        <p className='head-title__des'>How can you evaluate content without design</p>
      </div>
      <div className='new-product__products'></div>
    </div>
  );
};

export default NewProduct;
