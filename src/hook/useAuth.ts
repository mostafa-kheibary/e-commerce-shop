import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/User/UserContext';

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { state } = useUserContext();
  useEffect(() => {
    if (state.user) {
      setIsAuth(true);
      setLoading(false);
    } else {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuth(true);
          setLoading(false);
        } else {
          setIsAuth(false);
          setLoading(false);
        }
      });
    }
  }, [state.user]);
  return { loading, isAuth };
};

export default useAuth;
