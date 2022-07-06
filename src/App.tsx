import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { CartContextProvider } from './context/Cart/CartContext';
import { Header, ProfileDetails, ProfileFavourit, ProfileOrder, ProfileSetting } from './Layout';
import { About, Home, Product, Profile, SignIn } from './page';
import PrivetRoute from './routes/PrivetRoute';

const App: React.FC = () => {
  return (
    <CartContextProvider>
      <Router>
        <Header />
        <Toast />
        <div style={{ marginTop: '8rem' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/shop/product/:id' element={<Product />} />
            {/* privet pages */}
            <Route element={<PrivetRoute />}>
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<Profile />}>
                <Route path='details' element={<ProfileDetails />} />
                <Route path='favourit' element={<ProfileFavourit />} />
                <Route path='order' element={<ProfileOrder />} />
                <Route path='setting' element={<ProfileSetting />} />
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
