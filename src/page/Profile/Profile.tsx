import { useUserContext } from '../../context/User/UserContext';
import { Outlet, useLocation } from 'react-router-dom';
import './Profile.css';
import { Container, ProfileSideBar } from '../../Layout';

const Profile: React.FC = () => {
  const loc = useLocation();
  const {
    state: { user },
  } = useUserContext();
  return (
    <Container className='profile-container'>
      <div className='profile__sidebar'>
        <ProfileSideBar />
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
