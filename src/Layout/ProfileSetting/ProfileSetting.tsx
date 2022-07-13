import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useUserContext } from '../../context/User/UserContext';
const ProfileSetting: React.FC = () => {
  const { dispath } = useUserContext();
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
      <h2>Acount setting</h2>
      <h4>log out from account</h4>
      <Button onClick={handleLogOut}>Log out</Button>
      <hr />
      <h4>delete your account</h4>
      <p>it will clear all your orders, user log on server </p>
      <Button>delete Acount</Button>
    </div>
  );
};

export default ProfileSetting;
