import { AiOutlineUser, AiOutlineShopping, AiOutlineSetting, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/User/UserContext';
import './ProfileSideBar.css';

const ProfileSideBar: React.FC = () => {
  const {
    state: { user },
  } = useUserContext();

  const linkData = [
    { to: 'details', text: 'My details', icon: <AiOutlineUser /> },
    { to: 'favourit', text: 'My favourit', icon: <AiOutlineHeart /> },
    { to: 'order', text: 'My order', icon: <AiOutlineShopping /> },
    { to: 'setting', text: 'Acount setting', icon: <AiOutlineSetting /> },
  ];
  return (
    <div className='profile-sidebar'>
      <h2 className='profile-sidebar__title'>Hi {user.displayName}</h2>
      <div className='profile-sidebar__links'>
        {linkData.map((link, i) => (
          <Link
            key={i}
            className={`profile-sidebar__link ${window.location.pathname.split('/')[2] === link.to ? 'active' : ''}`}
            to={link.to}
          >
            <div className='profile-sidebar__link-content'>
              {link.text}
              {link.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSideBar;
