import { Slider, NewProduct, Container } from '../../Layout';
import { useUserContext } from '../../context/User/UserContext';
const Home: React.FC = () => {
  const { state, dispath } = useUserContext();
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
