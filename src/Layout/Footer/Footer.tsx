import { FC } from 'react';
import './Footer.css';

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <h2 className='footer__title'>Ecommerce Shop</h2>
        <p className='footer__discription'>this site build for practice and dont have any real business or products</p>
      </div>
      <div className='sub-footer'>
        <span className='footer__copyright'>
          Copyright 2022{' '}
          <a className='footer__link' href='https://github.com/mostafa-kheibary' target='_blank'>
            Mostafa Kheibary
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
