import { FC } from 'react';
import './Loader.css';

interface IProps {
  color?: 'white' | 'primary';
}
const Loader: FC<IProps> = ({ color = 'primary' }) => {
  return (
    <div className={`lds-roller ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
