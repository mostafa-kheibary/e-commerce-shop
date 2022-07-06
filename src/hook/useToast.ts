import { useToastContext } from '../context/Toast/ToastContext';

type IfuctionProps = (title: string, discription: string) => void;

const useToast = () => {
  const { state, dispath } = useToastContext();

  const errorToast: IfuctionProps = (title, discription) => {
    if (!state.isShow) {
      dispath({ type: 'ADD_TOAST', payload: { title, discription, type: 'error' } });
      setTimeout(() => {
        clearToast();
      }, 3000);
    }
  };
  const succsesToast: IfuctionProps = (title, discription) => {
    if (!state.isShow) {
      dispath({ type: 'ADD_TOAST', payload: { title, discription, type: 'succses' } });

      setTimeout(() => {
        clearToast();
      }, 3000);
    }
  };
  const clearToast = (): void => {
    dispath({ type: 'CLEAR_TOAST' });
  };

  return { errorToast, succsesToast };
};

export default useToast;
