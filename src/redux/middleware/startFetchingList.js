import { getViewLimit } from '../../selectors';

const startFetchingUsers = store => next => (action) => {
  if (action.type !== 'START_FETCHING_LIST') return next(action);
  function* getId() {
    let id = 0;
    while (true) {
      id += 1;
      yield id;
    }
  }
  const limit = getViewLimit(store.getState());
  const countIds = getId();
  let isStart = true;

  while (isStart) {
    const id = countIds.next().value;
    if (id >= limit) {
      isStart = false;
    }
    store.dispatch(Object.assign({}, { type: 'FETCH_USER', payload: id }));
  }
  const timeoutId = setInterval(() => store.dispatch(Object.assign({}, { type: 'FETCH_USER', payload: countIds.next().value })), 5000);

  return () => {
    clearTimeout(timeoutId);
  };
};

export default { startFetchingUsers };
