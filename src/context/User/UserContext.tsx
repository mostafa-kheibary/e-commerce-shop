import { createContext, useReducer, ReactNode, Reducer, useContext } from 'react';
import userReducer from './userReducer';

interface IProps {
  children: ReactNode;
}
interface IState {
  user: any;
}
const initState: IState = {
  user: null,
};
const userContext = createContext<any>({});

const UserContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer<Reducer<any, any>>(userReducer, initState);

  return <userContext.Provider value={{ state, dispath }}>{children}</userContext.Provider>;
};

interface IContext {
  state: IState;
  dispath: any;
}
const useUserContext = (): IContext => useContext(userContext);

export default userContext;
export { UserContextProvider, useUserContext };
