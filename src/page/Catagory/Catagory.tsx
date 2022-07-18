import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../Layout';
import phoneImage from '../../assets/image/phone-catagory.jpg';
import consoleImage from '../../assets/image/console-catagory.jpg';
import accImage from '../../assets/image/acc-catagory.jpg';
import headphoneImage from '../../assets/image/headphone-catagory.jpg';
import './Catagory.css';

const Catagory: FC = () => {
  return (
    <Container>
      <div className='catagory'>
        <Link className='catagory__link' to='phone'>
          <img className='catagory__image' src={phoneImage} alt="phone's picture" />
          <h4 className='catagory__text'>Phone</h4>
        </Link>
        <Link className='catagory__link' to='headphone'>
          <img className='catagory__image' src={headphoneImage} alt="phone's picture" />
          <h4 className='catagory__text'>HeadPhone</h4>
        </Link>
        <Link className='catagory__link' to='accessories'>
          <img className='catagory__image' src={accImage} alt="phone's picture" />
          <h4 className='catagory__text'>Accessories</h4>
        </Link>
        <Link className='catagory__link' to='consoles'>
          <img className='catagory__image' src={consoleImage} alt="phone's picture" />
          <h4 className='catagory__text'>Consoles</h4>
        </Link>
      </div>
    </Container>
  );
};

export default Catagory;
