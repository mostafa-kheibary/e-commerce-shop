import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Layout';
import About from './page/About/About';
import Home from './page/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '8rem' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
