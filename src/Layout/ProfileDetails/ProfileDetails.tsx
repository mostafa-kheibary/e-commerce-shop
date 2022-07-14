import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { Button, Input } from '../../components';
import { db } from '../../config/firebase.config';
import { useLoader } from '../../context/Loader/LoaderContext';
import { useUserContext } from '../../context/User/UserContext';
import useForm from '../../hook/useForm';
import useToast from '../../hook/useToast';
import './ProfileDetails.css';

const ProfileDetails: React.FC = () => {
  const auth = getAuth();
  const { setLoader } = useLoader();
  const { errorToast, succsesToast } = useToast();
  const {
    state: { user },
    dispath,
  } = useUserContext();
  const handleUpdateProfile = async () => {
    try {
      setLoader(true);
      const docRef = doc(db, 'users', auth.currentUser!.uid);
      await Promise.all([
        await updateProfile(auth.currentUser!, {
          displayName: values.name,
        }),
        await updateEmail(auth.currentUser!, values.email),
        await updateDoc(docRef, { name: values.name, email: values.email }),
      ]);
      setLoader(false);
      dispath({ type: 'LOG_IN', payload: auth.currentUser });
      succsesToast('profile succsesfuly updated', '');
    } catch (error) {
      errorToast('cant update the profile', 'try again and make sure about your network');
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, values } = useForm(handleUpdateProfile, {
    name: user.displayName || '',
    email: user.email || '',
  });

  return (
    <div className='profile-details'>
      <h2 className='profile-details__title'>My Details </h2>
      <div className='profile-details__personal-info'>
        <h4 className='profile-details__personal-info__title'>personal information</h4>
        <hr className='profile-details__line' />
        <form onSubmit={handleSubmit} className='profile-details__form'>
          <div className='profile-details__form__inputs'>
            <Input required onChange={handleChange} name='name' placeholder='name' type='text' value={values.name} />
            <Input
              required
              name='email'
              onChange={handleChange}
              value={values.email}
              placeholder='email'
              type='email'
            />
          </div>
          <Button className='profile-details__submit-button' type='submit'>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
