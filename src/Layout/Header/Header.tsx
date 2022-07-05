import { useEffect, useState } from 'react';
import { MobileNav, Nav, ShopCart } from '../../components';
import menuData from '../../data/menuData';
import logo from '../../assets/svg/Logo.svg';
import './Header.css';
import LoginButton from '../../components/LoginButton/LoginButton';

const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect((): any => {
    window.addEventListener('scroll', (): void => {
      if (window.scrollY > 80) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return (): void => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className={`header-container ${show ? 'sticky' : ''}`}>
      <div className={`header ${show ? 'sticky' : ''}`}>
        <MobileNav />
        <div className='header-left'>
          <img className='header-logo' src={logo} alt='logo of website' />
          <Nav links={menuData} />
        </div>
        <div className='header-right'>
          <ShopCart />
          <LoginButton />
        </div>
      </div>
    </div>
  );
};
export default Header;
