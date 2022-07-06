import { createContext, ReactNode, Reducer, useReducer, useContext } from 'react';
import toastReducer from './ToastReducer';
const ToastContext = createContext({});

const initialState = {
  isShow: false,
  type: '',
  title: '',
  discription: '',
};
interface IProps {
  children: ReactNode;
}
const ToastContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer<Reducer<any, any>>(toastReducer, initialState);

  return <ToastContext.Provider value={{ state, dispath }}>{children}</ToastContext.Provider>;
};

const useToastContext = (): any => useContext(ToastContext);

export { ToastContextProvider, useToastContext };
export default ToastContext;
