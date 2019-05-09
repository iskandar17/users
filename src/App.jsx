import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _noop from 'lodash.noop';
import './App.css';
import List from './tiles';
import { getList } from './selectors';

const mapState = state => ({
  listData: getList(state),
});
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch({ type: 'START_FETCHING_LIST' }),
  setMaxCount: count => dispatch({ type: 'SET_MAX_TILES_COUNT', payload: { limit: count } }),
});

function App({ fetchUser, setMaxCount, listData }) {
  const wrapper = useRef(null);

  useEffect(() => {
    let ignore = false;
    const startFetching = async (count) => {
      await setMaxCount(count);
      fetchUser();
    };
    const getMaxCount = () => Math.floor(wrapper.current.clientWidth / 130);
    const resizeHandler = () => setMaxCount(getMaxCount());

    if (!ignore) {
      startFetching(getMaxCount());
      window.addEventListener('resize', resizeHandler);
    }
    return () => {
      ignore = true;
      window.removeEventListener('resize', resizeHandler);
    };
  }, [fetchUser, setMaxCount]);

  return (
    <div ref={wrapper} className="App">
      <List list={listData} />
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
