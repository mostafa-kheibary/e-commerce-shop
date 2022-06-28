import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hook/useAuth';

interface IProps {
  children?: React.ReactNode;
}
const PrivetRoute: React.FC<IProps> = () => {
  const { loading, isAuth } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuth ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivetRoute;
