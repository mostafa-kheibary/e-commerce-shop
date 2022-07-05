import './Container.css';
interface Iprops {
  children: React.ReactNode;
  className?: string;
}
const Container: React.FC<Iprops> = ({ children, className }) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
