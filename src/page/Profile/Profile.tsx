import { Button } from '../../components';
import { useUserContext } from '../../context/User/UserContext';
import { getAuth, signOut } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import './Profile.css';
import { Container, ProfileSideBar } from '../../Layout';

const Profile: React.FC = () => {
  const {
    state: { user },
    dispath,
  } = useUserContext();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispath({ type: 'LOG_OUT' });
      navigate('/');
    } catch (error) {
      console.log('error in sign out');
    }
  };
  return (
    <Container className='profile-container'>
      <div className='profile__sidebar'>
        <ProfileSideBar />
      </div>
      <div className='profile__content'>
        {window.location.pathname.split('/')[2] ? (
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
