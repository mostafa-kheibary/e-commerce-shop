import { IMenuData } from '../../data/menuData';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
                <Link className='nav-link' to={link.url}>
                  <span>{link.name}</span>
                  <MdKeyboardArrowDown />
                </Link>
                <ul className='nav__sub-menu'>
                  {link.submenu.map((sublink, subindex) => (
                    <li className='nav__sub-menu__item' key={subindex}>
                      <Link className='nav-link' to={sublink.url}>{sublink.name}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link className='nav-link' to={link.url}>{link.name}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
