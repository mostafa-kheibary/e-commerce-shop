import { Slider, NewProduct, Container } from '../../Layout';
import { getAuth } from 'firebase/auth';
const Home: React.FC = () => {
  const auth = getAuth();
  console.log(auth.currentUser);
  return (
    <div className='home'>
      <Slider />
      <Container>
        <NewProduct />
      </Container>
    </div>
  );
};

export default Home;
