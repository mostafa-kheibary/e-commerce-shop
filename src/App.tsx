import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartContextProvider } from './context/Cart/CartContext';
import { Header } from './Layout';
import { About, Home, Profile, SignIn } from './page';
import PrivetRoute from './routes/PrivetRoute';

const App: React.FC = () => {
  return (
    <CartContextProvider>
      <Router>
        <Header />
        <div style={{ marginTop: '8rem' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/about' element={<About />} />
            <Route element={<PrivetRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartContextProvider>
  );
};

export default App;
