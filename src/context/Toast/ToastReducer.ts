type State = { type: string; title: string; discription: string };
type Action = { type: string; payload: any };

const toastReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        type: action.payload.type,
        title: action.payload.title,
        discription: action.payload.discription,
        isShow: true,
      };
    case 'CLEAR_TOAST':
      return { ...state, isShow: false };
    default:
      return { type: '', discription: '', title: '' };
  }
};
export default toastReducer;
