import { AiOutlineUser, AiOutlineShopping, AiOutlineSetting } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';

import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/User/UserContext';
import './ProfileSideBar.css';

const ProfileSideBar: React.FC = () => {
  const {
    state: { user },
  } = useUserContext();

  return (
    <div className='profile-sidebar'>
      <h2 className='profile-sidebar__title'>Hi {user.displayName}</h2>
      <div className='profile-sidebar__links'>
        <Link className='profile-sidebar__link' to='details'>
          <AiOutlineUser />
          My details
        </Link>
        <Link className='profile-sidebar__link' to='adress'>
          <GoLocation />
          My adress book
        </Link>
        <Link className='profile-sidebar__link' to='order'>
          <AiOutlineShopping />
          My order
        </Link>
        <Link className='profile-sidebar__link' to='setting'>
          <AiOutlineSetting />
          Acount setting
        </Link>
      </div>
    </div>
  );
};

export default ProfileSideBar;
