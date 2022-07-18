import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ElevatorButton, LoaderScreen, Toast } from './components';
import { Header, ProfileDetails, ProfileFavourit, ProfileOrder, ProfileSetting } from './Layout';
import Order from './Layout/Order/Order';
import { About, Catagory, CatagoryPage, Home, NotFound, Product, Profile, Shop, SignIn } from './page';
import PrivetRoute from './routes/PrivetRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Toast />
      <ElevatorButton />
      <LoaderScreen />
      <Header />
      <div style={{ marginTop: '8rem' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/shop/:id' element={<Product />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Order />} />
          <Route path='/checkout' element={<Order />} />
          <Route path='/thanks' element={<Order />} />
          <Route path='/catagory' element={<Catagory />} />
          <Route path='/catagory/:name' element={<CatagoryPage />} />
          <Route path='*' element={<NotFound />} />
          {/* privet pages */}
          <Route element={<PrivetRoute />}>
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
