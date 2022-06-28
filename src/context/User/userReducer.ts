interface IState {
  user: any;
}
interface IAction {
  type: string;
  payload: any;
}
const userReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload };
  }
};
export default userReducer;
