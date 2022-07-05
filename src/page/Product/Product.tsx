import { Container, ProductSlider } from '../../Layout';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { IProducts } from '../../types/productsType';
const Product: React.FC = () => {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<IProducts | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, 'products', `${id}`);
        const data = await getDoc(docRef);
        const productData: any = data.data();
        setProduct(productData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const sliderData = [
    {
      image:
        'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1654601185/Croma%20Assets/Gaming/Gaming%20Software/Images/255344_tnz1h8.png/mxw_1536,f_auto',
    },
    {
      image:
        'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1655955674/Croma%20Assets/Entertainment/Television/Images/251190_azcpvl.png/mxw_1536,f_auto',
    },
  ];
  if (!product) {
    return <h2>nothig found</h2>;
  }
  return (
    <Container className='product-page'>
      <div className='product-page__image'>
        <ProductSlider />
      </div>
      <div className='product-page__conetent'>
        <h2>{product.name}</h2>
      </div>
    </Container>
  );
};

export default Product;
