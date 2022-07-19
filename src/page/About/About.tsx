import { Button } from '../../components';
import { Container } from '../../Layout';
import './About.css';

const About: React.FC = () => {
  return (
    <Container>
      <div className='about'>
        <h2 className='about__title'>E-commerce shop</h2>
        <h4 className='about__autur'>develope by Mostafa Kheibary</h4>
        <p className='about__discription'>this is personal project for practice purposes</p>
        <Button className='about__button secoundry'>
          <a href='https://github.com/mostafa-kheibary/e-commerce-shop'>Github Page</a>
        </Button>
      </div>
    </Container>
  );
};

export default About;
