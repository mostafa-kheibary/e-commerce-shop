interface IState {
  user: any;
}
interface IAction {
  type: string;
  payload: any;
}
const userReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'LOG_IN':
      return { user: action.payload };
    case 'LOG_OUT':
      return { user: null };
  }
};
export default userReducer;
