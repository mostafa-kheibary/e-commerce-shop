import { Navigate, Outlet } from 'react-router-dom';
import { LoaderPage } from '../components';
import useAuth from '../hook/useAuth';

interface IProps {
  children?: React.ReactNode;
}
const PrivetRoute: React.FC<IProps> = () => {
  const { loading, isAuth } = useAuth();
  if (loading) {
    return <LoaderPage />;
  }
  return isAuth ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivetRoute;
