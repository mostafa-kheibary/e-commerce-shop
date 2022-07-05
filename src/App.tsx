import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartContextProvider } from './context/Cart/CartContext';
import { Header, ProfileDetails } from './Layout';
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
            {/* privet pages */}
            <Route element={<PrivetRoute />}>
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<Profile />}>
                <Route path='details' element={<ProfileDetails />} />
                <Route path='addres' element={<ProfileDetails />} />
                <Route path='order' element={<ProfileDetails />} />
                <Route path='setting' element={<ProfileDetails />} />
              </Route>
            </Route>
            {/* privet pages */}
          </Routes>
        </div>
      </Router>
    </CartContextProvider>
  );
};

export default App;
