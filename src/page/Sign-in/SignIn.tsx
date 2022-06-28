import { motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import useForm from '../../hook/useForm';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { Login } from '../../components';
import loadingBar from '../../assets/svg/loadingBar.svg';
import { IProducts } from '../../types/productsType';
import './SignIn.css';
import VerifyCodeInput from '../../components/VerifyCodeInput/VerifyCodeInput';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}
interface IUser {
  name: string;
  id: string;
  phone: string;
  purchuses: IProducts[];
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'start' | 'verify'>('start');
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<number | null>(null);
  const auth = getAuth();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  }, [auth]);

  const handleCodeChnage = (code: string) => {
    setVerifyCode(+code);
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
      console.log(error);
    }
  };
  const handleSubmitFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const respone = await window.confirmationResult.confirm(verifyCode);
      const user = respone.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const newUser: IUser = {
          name: 'new user',
          id: user.uid,
          phone: values.phone,
          purchuses: [],
        };
        await setDoc(doc(db, 'users', user.uid), newUser);
        navigate('/profile/edit');
      } else {
        navigate('/profile');
      }
      setLoading(false);
      console.log(user);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const { values, handleChange, handleSubmit } = useForm(getVerifyCode);

  return (
    <div className='login-background'>
      <Login>
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='sign-in'>
          <h2 className='sign-in__title'>{stage === 'start' ? 'Sign up with your phone number ' : 'Enter the code'}</h2>
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
            </form>
          ) : (
            <motion.form
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='form__code'
              onSubmit={handleSubmitFinal}
            >
              <VerifyCodeInput onCodeChange={handleCodeChnage} />
              <button type='button' className='wrong-code-button' onClick={() => setStage('start')}>
                wrong code?
              </button>
              <Button type='submit'>
                {loading ? <img width={20} src={loadingBar} alt='loading' /> : 'sign in / sign up'}
              </Button>
            </motion.form>
          )}
        </motion.div>
      </Login>
    </div>
  );
};

export default SignIn;
