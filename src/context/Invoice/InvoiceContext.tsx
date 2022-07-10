import { useContext, useReducer, createContext, ReactNode, FC } from 'react';
import InvoiceReducer from './InvoiceReducer';

const InvoiceContext = createContext<any>({});

interface IProps {
  children: ReactNode;
}

const InvoiceContextProvider: FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer(InvoiceReducer, {});

  const setInvoice = (data: any): void => {
    dispath({ type: 'SET_INVOICE', payload: data });
  };
  return <InvoiceContext.Provider value={{ state, setInvoice }}>{children}</InvoiceContext.Provider>;
};

interface IReducer {
  state: any;
  setInvoice: (data: void) => void;
}
const useInvoiceContext = (): IReducer => useContext(InvoiceContext);

export { InvoiceContextProvider, useInvoiceContext };
export default InvoiceContext;
