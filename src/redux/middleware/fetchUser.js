import { getUsersList, getViewLimit } from '../../selectors';

const fetchUser = store => next => async (action) => {
  if (action.type !== 'FETCH_USER') {
    return next(action);
  }

  const OldList = getUsersList(store.getState());
  const limit = getViewLimit(store.getState());
  const newActionCreator = (data) => {
    const setData = () => {
      if (OldList.length >= limit) {
        OldList.splice(0, 1); // use action to store shown users
      }
      if (!data.error) {
        OldList.push(data);
      }

      return OldList;
    };
    const newAction = Object.assign({}, { type: 'UPDATE_LIST', payload: { list: setData() } });

    return newAction;
  };

  let response;
  let data;
  try {
    response = await fetch(`https://api.github.com/user/${action.payload}`);
    data = await response.json();
  } catch (err) {
    data = {
      error: true,
      data: err,
    };
  }
  return next(newActionCreator(data));
};

export default { fetchUser };
