import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Layout';
import { About, Home, SignIn } from './page';
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '8rem' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
