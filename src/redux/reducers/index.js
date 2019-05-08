import { combineReducers } from 'redux';
import showList from './list';
import maxTilesCount from './shownTilesCount';
import shownUsers from './shownUsers';
import userDetails from './userDetails';

export default combineReducers({
  showList,
  maxTilesCount,
  shownUsers,
  userDetails
});
