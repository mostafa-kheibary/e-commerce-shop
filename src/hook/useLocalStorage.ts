interface IReturnHook {
  setStorage: (key: string, data: any) => any;
  getStorage: (key: string) => any;
}

const useLocalStorage = (): IReturnHook => {
  const getStorage = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) || '');
  };
  const setStorage = (key: string, data: any): any => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  return { setStorage, getStorage };
};
export default useLocalStorage;
