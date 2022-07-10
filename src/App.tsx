import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { Header, ProfileDetails, ProfileFavourit, ProfileOrder, ProfileSetting } from './Layout';
import Order from './Layout/Order/Order';
import { About, Home, Product, Profile, SignIn } from './page';
import PrivetRoute from './routes/PrivetRoute';

const App: React.FC = () => {
  return (
      <Router>
        <Header />
        <Toast />
        <div style={{ marginTop: '8rem' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/shop/:id' element={<Product />} />
            <Route path='/cart' element={<Order />} />
            <Route path='/checkout' element={<Order />} />
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
  );
};

export default App;
