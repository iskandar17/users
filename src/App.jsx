import React, { useEffect, useRef, useState } from 'react';
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
  fetchUser: countFrom => dispatch({ type: 'START_FETCHING_LIST', payload: countFrom }),
  setMaxCount: count => dispatch({ type: 'SET_MAX_TILES_COUNT', payload: { limit: count } }),
});

function App({ fetchUser, setMaxCount, listData }) {
  const wrapper = useRef(null);
  const [clearTimmer, setTimmer] = useState(null); // eslint-disable-line

  useEffect(() => {
    let ignore = false;
    const startFetching = async (count) => {
      await setMaxCount(count);
      setTimmer(fetchUser());
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
      clearTimmer.then((clearTimmerId) => {
        clearTimmerId();
      });
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
