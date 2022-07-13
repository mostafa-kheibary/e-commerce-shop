import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { IProducts } from '../../types/productsType';
import { Loader, ProductCard } from '../../components';
import './NewProduct.css';

const NewProduct: React.FC = () => {
  const [products, setProducts] = useState<IProducts[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    // fetch and get product
    const allProducts: any[] = [];
    (async () => {
      const snapShot = await getDocs(collection(db, 'products'));
      snapShot.forEach((doc) => {
        const data = doc.data();
        allProducts.push(data);
      });
      setProducts(allProducts);
      setLoading(false);
    })();
  }, []);

  return (
    <div className='new-product'>
      <div className='new-product__head-title'>
        <span className='head-title__notic'>Hurry up to buy</span>
        <h2 className='head-title__main'>New Arrivals</h2>
        <p className='head-title__des'>How can you evaluate content without design</p>
      </div>
      {loading && <Loader />}
      <div className='new-product__wrapper'>
        {products.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
