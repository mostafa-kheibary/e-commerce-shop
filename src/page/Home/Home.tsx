import { Slider, NewProduct, Container } from '../../Layout';
const Home: React.FC = () => {
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
