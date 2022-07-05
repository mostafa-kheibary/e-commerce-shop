import { Button } from '../../components';
import { useUserContext } from '../../context/User/UserContext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Profile page</h2>
      <h3>{user.displayName}</h3>
      <Button onClick={handleLogOut} className='secoundry'>
        log out
      </Button>
    </div>
  );
};

export default Profile;
