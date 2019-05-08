export const startFetchingUsers = store => next => action => {
  if (action.type !== 'START_FETCHING_LIST') return next(action);
  const getId = function* () {
    let id = 0;
    while (true) {
      id++;
      yield id;
    }
  };
  const countIds = getId();
  const timeoutId = setInterval(() => store.dispatch(Object.assign({}, { type: 'FETCH_USER', payload: countIds.next().value })), 5000);
  return () => {
      clearTimeout(timeoutId);
  }
};
