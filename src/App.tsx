import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Slider } from './Layout';
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '8rem' }}>
        <Slider />
      </div>
    </Router>
  );
};

export default App;
