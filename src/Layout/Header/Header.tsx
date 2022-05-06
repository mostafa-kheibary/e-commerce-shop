import { Nav, ShopCart } from '../../components';
import menuData from '../../data/menuData';
import logo from '../../assets/svg/Logo.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className='header-left'>
        <img src={logo} alt='logo of website' />
        <Nav links={menuData} />
      </div>
      <div className='header-right'>
        <h4 className='header__register-button'>login/register</h4>
        <ShopCart />
      </div>
    </div>
  );
};

export default Header;
