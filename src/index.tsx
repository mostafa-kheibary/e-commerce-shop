import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider, useUserContext } from './context/User/UserContext';
import App from './App';
import './style/globalStyle.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserAuth = () => {
  const { dispath } = useUserContext();
  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      dispath({ type: 'SET_USER', payload: JSON.parse(localStorage.getItem('authUser') || '') });
    }
    const auth = getAuth();
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispath({ type: 'SET_USER', payload: user });
        localStorage.setItem('authUser', JSON.stringify(user));
      }
    });
    return sub;
  }, []);

  return <div></div>;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <UserContextProvider>
    <UserAuth />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserContextProvider>
);
