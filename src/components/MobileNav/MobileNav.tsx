import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './MobileNav.css';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hanldeOpenMenu = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='mobile-nav'>
      <button onClick={hanldeOpenMenu} className='mobile-nav__button'>
        <GiHamburgerMenu className='mobile-nav__button-icon' />
        <span className='mobile-nav__button-text'>MENU</span>
      </button>
      <div className={`mobile-nav__menu ${isOpen ? 'open' : ''}`}></div>
      <div
        onClick={hanldeOpenMenu}
        className={`over-lay ${isOpen ? 'visible' : ''}`}
      ></div>
    </div>
  );
};

export default MobileNav;
