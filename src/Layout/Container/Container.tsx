import './Container.css';
interface Iprops {
  children: React.ReactNode;
}
const Container: React.FC<Iprops> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Container;
