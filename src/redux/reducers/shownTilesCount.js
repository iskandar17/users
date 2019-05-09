const initialState = {
  limit: 0,
};

export default function maxCount(state = initialState, action) {
  switch (action.type) {
    case 'SET_MAX_TILES_COUNT':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
