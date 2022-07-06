import { useToastContext } from '../context/Toast/ToastContext';

type IfuctionProps = (title: string, discription: string) => void;

const useToast = () => {
  const { state, dispath } = useToastContext();

  const error: IfuctionProps = (title, discription) => {
    if (!state.isShow) {
      dispath({ type: 'ADD_TOAST', payload: { title, discription, type: 'error' } });
      setTimeout(() => {
        clearToast();
      }, 2000);
    }
  };
  const succses: IfuctionProps = (title, discription) => {
    if (!state.isShow) {
      dispath({ type: 'ADD_TOAST', payload: { title, discription, type: 'succses' } });

      setTimeout(() => {
        clearToast();
      }, 2000);
    }
  };
  const clearToast = (): void => {
    dispath({ type: 'CLEAR_TOAST' });
  };

  return { error, succses };
};

export default useToast;
