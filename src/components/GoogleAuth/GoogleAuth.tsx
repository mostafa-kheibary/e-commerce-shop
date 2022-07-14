import { FC } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import googleIcon from '../../assets/image/google.png';
import './GoogleAuth.css';
import { db } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hook/useToast';
import { useUserContext } from '../../context/User/UserContext';
import { useLoader } from '../../context/Loader/LoaderContext';

const GoogleAuth: FC = () => {
  const naigate = useNavigate();
  const { errorToast } = useToast();
  const { dispath } = useUserContext();
  const { setLoader } = useLoader();
  const handleAuth = async () => {
    try {
      setLoader(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          phone: '',
          purchuses: [],
          favourite: [],
        });
      }
      setLoader(false);
      dispath({ type: 'LOG_IN', payload: result.user });
      naigate('/profile');
    } catch (error) {
      setLoader(false);
      errorToast('cant login with google', 'please try again to log in');
    }
  };
  return (
    <button onClick={handleAuth} type='button' className='google-auth__wrapper'>
      <img className='google-auth__image' src={googleIcon} alt='google icon' />
      <span className='google-auth__text'>Continue with Google</span>
    </button>
  );
};

export default GoogleAuth;
