import { createContext, FC, ReactNode, useContext, useState } from 'react';

const LoaderContext = createContext<any>({});

interface IProps {
  children: ReactNode;
}
const LoaderContextProvider: FC<IProps> = ({ children }) => {
  const [isLoading, setLoader] = useState<boolean>(false);

  return <LoaderContext.Provider value={{ isLoading, setLoader }}>{children}</LoaderContext.Provider>;
};
interface IContext {
  isLoading: boolean;
  setLoader: (status:boolean) => void;
}
const useLoader = (): IContext => useContext(LoaderContext);
export { LoaderContextProvider, useLoader };
