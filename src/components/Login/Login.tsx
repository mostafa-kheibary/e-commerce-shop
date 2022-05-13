import './Login.css';

interface Props {
  children: React.ReactNode;
}
const Login: React.FC<Props> = ({ children }) => {
  return <div className='login-form'>{children}</div>;
};

export default Login;
