const initialState = {};

export default function shownUsers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SHOWN_USER':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
