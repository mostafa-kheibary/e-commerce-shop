import { motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import useForm from '../../hook/useForm';
import { useNavigate } from 'react-router-dom';
import { Button, GoogleAuth, Input } from '../../components';
import { Login } from '../../components';
import loadingBar from '../../assets/svg/loadingBar.svg';
import { IProducts } from '../../types/productsType';
import { useUserContext } from '../../context/User/UserContext';
import './SignIn.css';
import VerifyCodeInput from '../../components/VerifyCodeInput/VerifyCodeInput';
import useToast from '../../hook/useToast';
import { useLoader } from '../../context/Loader/LoaderContext';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}
interface IUser {
  name: string;
  email: string;
  id: string;
  phone: string;
  purchuses: IProducts[];
  favourite: any[];
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { dispath } = useUserContext();
  const { errorToast, succsesToast } = useToast();
  const [stage, setStage] = useState<'start' | 'verify' | 'newUser'>('start');
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<number>(0);
  const { setLoader } = useLoader();
  const auth = getAuth();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  }, [auth]);

  const handleCodeChnage = (code: string) => {
    setVerifyCode(+code);
    if (code.length >= 6) {
      handleSubmitFinal(+code);
    }
  };
  const getVerifyCode = async () => {
    try {
      setLoading(true);
      const confirmationResult = await signInWithPhoneNumber(auth, values.phone, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setStage('verify');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast('canrt get code', 'try again and get new code ');
    }
  };
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitFinal(verifyCode);
  };
  const handleSubmitFinal = async (code: number) => {
    try {
      setLoading(true);
      const respone = await window.confirmationResult.confirm(code);
      const user = respone.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const newUser: IUser = {
          name: 'new user',
          email: '',
          id: user.uid,
          phone: values.phone,
          purchuses: [],
          favourite: [],
        };
        await setDoc(doc(db, 'users', user.uid), newUser);
        setStage('newUser');
      } else {
        navigate('/profile');
        succsesToast('Login succsesfully', 'Now you can see your information in profile tabs');
      }
      dispath({ type: 'LOG_IN', payload: user });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.toString().includes('auth/invalid-verification-code')) {
        errorToast('code is not correct', 'please enter correct code');
      } else {
        errorToast('somthing went wrong', 'cant login, try again');
      }
    }
  };
  const handleChnageName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(true);
      const user = auth.currentUser;
      const newUser: IUser = {
        name: values.name,
        email: '',
        id: user!.uid,
        phone: values.phone,
        purchuses: [],
        favourite: [],
      };
      await Promise.all([
        await setDoc(doc(db, 'users', user!.uid), newUser),
        await updateProfile(user!, { displayName: values.name }),
      ]);
      setLoader(false);
      navigate('/profile');
      succsesToast('Login succsesfully', 'Now you can see your information in profile tabs');
    } catch (error) {
      setLoader(false);
      errorToast('somthing went wrong', 'cant add user name try again');
    }
  };
  const { values, handleChange, handleSubmit } = useForm(getVerifyCode);

  return (
    <div className='login-background'>
      <Login>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='sign-in'>
          <h2 className='sign-in__title'>
            {stage === 'start'
              ? 'Sign up with your phone number '
              : stage === 'verify'
              ? 'Enter the code'
              : 'welcome , add your name'}
          </h2>
          {stage === 'start' ? (
            <form onSubmit={handleSubmit} className='sign-in__form'>
              <Input
                onChange={handleChange}
                type='text'
                required
                pattern='[0-9+]{8,13}'
                name='phone'
                placeholder='+12124567890'
              />
              <div id='recaptcha-container'></div>
              <Button className='sign-in__button' type='submit'>
                {loading ? <img width={20} src={loadingBar} alt='loading' /> : 'send verification code'}
              </Button>
              <h4 style={{ fontWeight: 300, fontSize: '1.5rem', textAlign: 'center' }}>or</h4>
              <GoogleAuth />
            </form>
          ) : stage === 'verify' ? (
            <motion.form
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='form__code'
              onSubmit={handleLogin}
            >
              <p className='sign-in__status-sms'>we send SMS to your phone : {values.phone}</p>
              <VerifyCodeInput onCodeChange={handleCodeChnage} />
              <button type='button' className='wrong-code-button' onClick={() => setStage('start')}>
                wrong phone number?
              </button>
              <Button type='submit'>
                {loading ? <img width={20} src={loadingBar} alt='loading' /> : 'sign in / sign up'}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              onSubmit={handleChnageName}
              className='form__user-name'
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Input name='name' onChange={handleChange} required placeholder='Mostafa Kheibary' />
              <Button type='submit'>submit</Button>
            </motion.form>
          )}
        </motion.div>
      </Login>
    </div>
  );
};

export default SignIn;
