import { FC } from 'react';
import './LoaderPage.css';
const LoaderPage: FC = () => {
  return (
    <div className='loader-page'>
      <div className='lds-facebook'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderPage;
