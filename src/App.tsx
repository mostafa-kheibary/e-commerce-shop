import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartContextProvider } from './context/Cart/CartContext';
import { useUserContext } from './context/User/UserContext';
import { Header } from './Layout';
import { About, Home, Profile, SignIn } from './page';

const App: React.FC = () => {

  return (
    <CartContextProvider>
      <Router>
        <Header />
        <div style={{ marginTop: '8rem' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </CartContextProvider>
  );
};

export default App;
