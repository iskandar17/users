import { applyMiddleware } from 'redux';
import fetchUser from './fetchUser';
import { fetchUserDetails } from './fetchUserDetails';
import logger from './logger';
import startFetchingUsers from './startFetchingList';

export default applyMiddleware(
  fetchUser,
  fetchUserDetails,
  logger,
  startFetchingUsers,
);
