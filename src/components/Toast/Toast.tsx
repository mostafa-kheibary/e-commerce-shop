import { AiOutlineClose } from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';
import { MdOutlineDone } from 'react-icons/md';
import { useToastContext } from '../../context/Toast/ToastContext';
import './Toast.css';

const Toast: React.FC = () => {
  const { state, dispath } = useToastContext();
  const handleClose = () => {
    dispath({ type: 'CLEAR_TOAST' });
  };

  return (
    <div className={`toast ${state.isShow ? 'active' : ''}`}>
      <span className={`toast__line status-${state.type}`}></span>
      <button onClick={handleClose} className='toast__close-button'>
        <AiOutlineClose />
      </button>
      {state.type === 'error' ? (
        <RiErrorWarningLine className='toast-icon toast-error-icon' />
      ) : state.type === 'succses' ? (
        <MdOutlineDone className='toast-icon toast-succses-icon' />
      ) : (
        ''
      )}
      <div className='toast-content'>
        <h4 className='toast__title'>{state.title}</h4>
        <p className='toast__discription'>{state.discription}</p>
      </div>
    </div>
  );
};

export default Toast;
