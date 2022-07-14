import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useUserContext } from '../../context/User/UserContext';
import './ProfileSetting.css';

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
    <div className='profile-setting'>
      <div className='profile-setting__head'>
        <h2 className='profile-setting__title'>Acount setting</h2>
        <Button onClick={handleLogOut}>Log out</Button>
      </div>
      <hr className='profile-setting__line' />
      <div className='profile-setting__content'>
        <h4 className='profile-setting__text'>delete your account</h4>
        <p className='profile-setting__discription'>it will clear all your orders, user log on server </p>
        <Button className='profile-setting__delete-button'>delete Acount</Button>
      </div>
    </div>
  );
};

export default ProfileSetting;
