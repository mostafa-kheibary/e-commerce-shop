import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Layout/Header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
    </Router>
  );
};

export default App;
