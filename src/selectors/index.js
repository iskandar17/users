import { createSelector } from 'reselect'; // eslint-disable-line

const getViewLimit = ({ maxTilesCount }) => maxTilesCount.limit;
export const getUsersList = ({ showList }) => showList;

export const getList = createSelector(getUsersList, getViewLimit, ({ list }, limit) => {
  if (list.length >= limit) {
    return [...list].splice(limit * -1, limit);
  }
  return [...list];
});

export const getListMax = createSelector(getViewLimit, limit => limit);
