import { collection, getDocs, query, where } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard, ProductCardLoading } from '../../components';
import ProductContainer from '../../components/ProductsContainer/ProductContainer';
import { db } from '../../config/firebase.config';
import { Container } from '../../Layout';
import { IProducts } from '../../types/productsType';

const CatagoryPage: FC = () => {
  const { name } = useParams();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productData: any[] = [];
        const queryRef = query(collection(db, 'products'), where('catagory', '==', name));
        const querySnap = await getDocs(queryRef);
        querySnap.forEach((chunk) => {
          productData.push(chunk.data());
        });
        setLoading(false);
        setProducts(productData);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Container>
      <ProductContainer>
        {loading && new Array(6).fill(0).map((_, i) => <ProductCardLoading key={i} />)}
        {products.map((product, i: number) => (
          <ProductCard key={i} productData={product} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default CatagoryPage;
