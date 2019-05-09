import { getList, getUsersList } from '../../selectors';

const fetchUser = store => next => async (action) => {
  if (action.type !== 'FETCH_USER') {
    return next(action);
  }

  const MAX_ITEMS_TO_STORE = 5000;
  const OldList = getUsersList(store.getState()).list;
  const listToStore = OldList.length > MAX_ITEMS_TO_STORE ? getList(store.getState()) : OldList;
  const newActionCreator = (data) => {
    const setData = () => {
      if (!data.error) {
        listToStore.push(data);
      }

      return listToStore;
    };
    const newAction = Object.assign({}, { type: 'UPDATE_LIST', payload: { list: setData() } });

    return newAction;
  };

  let response;
  let data;
  try {
    response = await fetch(`https://api.github.com/user/${action.payload}`);
    data = await response.json();
    if (response.status !== 200) {
      throw data;
    }
  } catch (err) {
    data = {
      error: true,
      data: err,
    };
  }
  return next(newActionCreator(data));
};

export default fetchUser;
