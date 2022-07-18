import { useUserContext } from '../../context/User/UserContext';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Profile.css';
import { Container, ProfileSideBar } from '../../Layout';

const Profile: React.FC = () => {
  const loc = useLocation();
  const pathname = loc.pathname.split('/')[2];
  const {
    state: { user },
  } = useUserContext();
  return (
    <Container className='profile-container'>
      <div className='profile__sidebar'>
        <ProfileSideBar />
      </div>
      <div className='profile__mobile-navigation'>
        <Link className={`profile__mobile-navigation__link ${pathname === 'details' ? 'active' : ''}`} to='details'>
          Profile Details
        </Link>
        <Link className={`profile__mobile-navigation__link ${pathname === 'favourit' ? 'active' : ''}`} to='favourit'>
          My favourit
        </Link>
        <Link className={`profile__mobile-navigation__link ${pathname === 'order' ? 'active' : ''}`} to='order'>
          My order
        </Link>
        <Link className={`profile__mobile-navigation__link ${pathname === 'setting' ? 'active' : ''}`} to='setting'>
          Account Setting
        </Link>
      </div>
      <div className='profile__content'>
        {loc.pathname.split('/')[2] ? (
          <Outlet />
        ) : (
          <div>
            <h2 className='profile__content__welcome-message '>welcome {user.displayName || user.phoneNumber} </h2>
            <p className='profile__content__welcome-sub-message'>
              navigate between profile pages by link in left sidebar{' '}
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Profile;
