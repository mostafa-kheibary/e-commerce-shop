const useLocalStorage = () => {
  const getStorage = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) || '');
  };
  const setStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  return { setStorage, getStorage };
};
export default useLocalStorage;
