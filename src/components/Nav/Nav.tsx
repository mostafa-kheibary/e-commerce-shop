import { IMenuData } from '../../data/menuData';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import './Nav.css';

interface Props {
  links: IMenuData[];
}
const Nav: React.FC<Props> = ({ links }) => {
  return (
    <nav>
      <ul className='nav-wrapper'>
        {links.map((link, index) => (
          <li className='nav-item' key={index}>
            {link.submenu ? (
              <>
                <NavLink className='nav-link link-wrapper' to={link.url}>
                  <span>{link.name}</span>
                  <MdKeyboardArrowDown className='nav-link__arrow-icon' />
                </NavLink>
                <ul className='nav__sub-menu'>
                  {link.submenu.map((sublink, subindex) => (
                    <li className='nav__sub-menu__item' key={subindex}>
                      <NavLink className='nav-link' to={sublink.url}>
                        {sublink.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NavLink className='nav-link' to={link.url}>
                {link.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
