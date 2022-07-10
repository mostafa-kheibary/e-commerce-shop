const InvoiceReducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_INVOICE':
      return action.payload;
    default:
      return state;
  }
};
export default InvoiceReducer;
