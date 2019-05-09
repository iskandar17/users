const initialState = {
  list: [],
};

export default function shownList(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_LIST':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
