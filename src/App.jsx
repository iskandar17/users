import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _noop from 'lodash.noop';
import './App.css';
import List from './tiles';
import { getUsersList } from './selectors';

const mapState = state => ({
  listData: getUsersList(state),
});
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch({ type: 'START_FETCHING_LIST' }),
  setMaxCount: count => dispatch({ type: 'SET_MAX_TILES_COUNT', payload: { limit: count } }),
});

function App({ fetchUser, setMaxCount, listData }) {
  useEffect(() => {
    let ignore = false;
    const startFetching = async (count) => {
      await setMaxCount(count);
      fetchUser();
    };
    if (!ignore) {
      startFetching(6);
    }
    return () => { ignore = true; };
  }, [fetchUser, setMaxCount]);

  return (
    <div className="App">
      <List list={listData.list} />
    </div>
  );
}

App.propTypes = {
  fetchUser: PropTypes.func,
  setMaxCount: PropTypes.func,
  listData: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  fetchUser: _noop,
  setMaxCount: _noop,
  listData: [],
};

export default connect(mapState, mapDispatch)(App);