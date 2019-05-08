const fetchUserDetails = store => next => action => {
  if (!action.type !== 'FETCH_USER_DETAILS') {
    return next(action)
  }

  function newAction(ready, data) {
    const newAction = Object.assign({}, { type: 'SELECTED_USER' }, { payload: { ready, data } });
    return newAction
  }

  next(newAction(false));
  return fetch(`https://api.github.com/user/${action.payload}`).then(
    result => next(newAction(true, result.json())),
    error => next(newAction(true, { error }))
  )
};
export { fetchUserDetails };
