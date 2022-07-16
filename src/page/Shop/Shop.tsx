import { collection, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, startAfter } from 'firebase/firestore';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, ProductCard, ProductCardLoading } from '../../components';
import { db } from '../../config/firebase.config';
import { Container } from '../../Layout';
import { IProducts } from '../../types/productsType';
import './Shop.css';

const Shop: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [lastProduct, setLastProduct] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [filterdProducts, setFilterdProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const allProducts: any[] = [];
    setLoading(true);
    (async () => {
      const querySnap = query(collection(db, 'products'), limit(10));
      const snapShot = await getDocs(querySnap);
      snapShot.forEach((doc) => {
        const data = doc.data();
        allProducts.push(data);
      });
      const lastVisible = snapShot.docs[snapShot.docs.length - 1];
      setLoading(false);
      setLastProduct(lastVisible);
      setProducts(allProducts);
      setFilterdProducts(allProducts);
    })();
  }, []);

  // each time that call load 10 more products
  const loadMoreProducts = async () => {
    const productsArray: any = [];
    try {
      const nextProducts = query(collection(db, 'products'), startAfter(lastProduct), limit(10));
      const snapShot = await getDocs(nextProducts);
      snapShot.forEach((doc) => {
        const data = doc.data();
        productsArray.push(data);
      });
      setProducts(productsArray);
      setFilterdProducts(productsArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const textQuery = e.target.value.trim();
    const filterd = products.filter((product) => product.name.toLowerCase().includes(textQuery));
    setFilterdProducts(filterd);
  };

  return (
    <Container>
      <div className='shop'>
        <div className='shop__head'>
          <input className='shop__head__search' onChange={handleSearch} placeholder='search products' type='text' />
          <div className='shop__head__filter'>
            <select>
              <option>Sort by Price</option>
              <option>Sort by Price</option>
              <option>Sort by Price</option>
              <option>Sort by Price</option>
            </select>
            <Button className='shop__head__filter-button secoundry'>filter</Button>
          </div>
        </div>
        <div className='shop__products-section'>
          <span className='shop__products__status'>1-10 of {filterdProducts.length} products</span>
          <div className='shop__products'>
            {loading && new Array(10).fill(0).map(() => <ProductCardLoading />)}
            {filterdProducts.map((product) => (
              <ProductCard productData={product} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Shop;
