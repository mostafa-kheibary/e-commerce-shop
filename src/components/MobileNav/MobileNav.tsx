import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import menuData from '../../data/menuData';
import './MobileNav.css';

const NavLink: React.FC = () => {
  return (
    <ul className='nav-link-mobile'>
      {menuData.map((link, index) => (
        <li className='mobile-nav__links' key={index}>
          {link.submenu ? (
            <>
              <Link className='mobile-nav__links-text' to={link.url}>
                <span>{link.name}</span>
              </Link>
              <ul>
                {link.submenu.map((sublink, subindex) => (
                  <li className='mobile-nav__links__submenu' key={subindex}>
                    <Link className='mobile-nav__links-text' to={sublink.url}>
                      {sublink.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link className='mobile-nav__links-text' to={link.url}>
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

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
      {/* manu */}
      <div className={`mobile-nav__menu ${isOpen ? 'open' : ''}`}>
        <div className='mobile-nav__menu__search-box'>
          <input
            className='mobile-nav__menu__search-box__search-input'
            type=''
            placeholder='search for product'
          />
        </div>
        <NavLink />
      </div>
      {/* overlay */}
      <div
        onClick={hanldeOpenMenu}
        className={`over-lay ${isOpen ? 'visible' : ''}`}
      ></div>
    </div>
  );
};

export default MobileNav;
