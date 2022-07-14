import { FC } from 'react';
import { useLoader } from '../../context/Loader/LoaderContext';
import Loader from '../Loader/Loader';
import './LoaderScreen.css';

const LoaderScreen: FC = () => {
  const { isLoading } = useLoader();
  return (
    <div className={`loading-screen ${isLoading ? 'show' : ''}`}>
      <Loader color='white' />
    </div>
  );
};

export default LoaderScreen;
