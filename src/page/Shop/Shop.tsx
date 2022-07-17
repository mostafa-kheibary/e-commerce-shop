import { FC, Fragment, useEffect, useState } from 'react';
import { collection, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, startAfter } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import useInView from '../../hook/useInView';
import useToast from '../../hook/useToast';
import { IProducts } from '../../types/productsType';
import { Button, Loader, ProductCard, ProductCardLoading } from '../../components';
import { Container, Footer } from '../../Layout';
import './Shop.css';

const Shop: FC = () => {
  const { errorToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<IProducts[]>([]);
  const [allProductSize, setAllProductSize] = useState<number>(0);
  const [lastProduct, setLastProduct] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [filterdProducts, setFilterdProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const allProducts: any[] = [];
    setLoading(true);
    (async () => {
      try {
        // set all product in coloection size
        setAllProductSize((await getDocs(collection(db, 'products'))).size);
        // query to get first 10 products;
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
      } catch (error) {
        errorToast('cant load Products', 'please try again');
      }
    })();
  }, []);

  // each time that call load 10 more products
  const loadMoreProducts = async () => {
    const productsArray: any = [];
    try {
      setLoadMoreLoading(true);
      const nextProducts = query(collection(db, 'products'), startAfter(lastProduct), limit(10));
      const snapShot = await getDocs(nextProducts);
      snapShot.forEach((doc) => {
        const data = doc.data();
        productsArray.push(data);
      });
      const lastVisible = snapShot.docs[snapShot.docs.length - 1];
      setLoadMoreLoading(false);
      setLastProduct(lastVisible);
      setProducts([...products, ...productsArray]);
      setFilterdProducts([...filterdProducts, ...productsArray]);
    } catch (error) {
      setLoadMoreLoading(false);
    }
  };

  // check when user type or product add search with the search query
  useEffect(() => {
    const filterd = products.filter((product) => product.name.toLowerCase().includes(searchQuery));
    setFilterdProducts(filterd);
  }, [products, searchQuery]);

  const { elementRef } = useInView(loadMoreProducts);
  return (
    <>
      <Container>
        <div className='shop'>
          <div className='shop__head'>
            <input
              value={searchQuery}
              className='shop__head__search'
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='search products'
              type='text'
            />
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
            <span className='shop__products__status'>
              1-{filterdProducts.length} of {allProductSize} products
            </span>
            <div className='shop__products'>
              {loading && new Array(10).fill(0).map((_, i) => <ProductCardLoading key={i} />)}
              {filterdProducts.map((product, i) => (
                <Fragment key={i}>
                  <ProductCard productData={product} />
                </Fragment>
              ))}
              <div ref={elementRef}></div>
            </div>
            {loadMoreLoading && <Loader />}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Shop;
