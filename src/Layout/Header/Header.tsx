import { Nav } from '../../components';
import menuData from '../../data/menuData';
import logo from '../../assets/svg/Logo.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className='header-logo'>
        <img src={logo} alt='logo of website' />
      </div>
      <div className='header-nav'>
        <Nav links={menuData} />
      </div>
      <div className='header-tool'></div>
    </div>
  );
};

export default Header;
