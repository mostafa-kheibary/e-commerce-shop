import { Suspense, lazy } from 'react';
import { Slider } from '../../Layout';

const Home: React.FC = () => {
  const NewProduct = lazy(() => import('../../Layout/NewProducts/NewProduct'));
  const Container = lazy(() => import('../../Layout/Container/Container'));
  return (
    <div className='home'>
      <Slider />
      <Suspense fallback={<h2>loading</h2>}>
        <Container>
          <NewProduct />
        </Container>
      </Suspense>
    </div>
  );
};

export default Home;
