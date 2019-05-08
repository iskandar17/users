import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const mapState = state => ({
  ...state
});
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch({ type: 'START_FETCHING_LIST',}),
  setMaxCount: (count) => dispatch({ type: 'SET_MAX_TILES_COUNT', payload: { limit: count }}),
});

function App({ fetchUser, setMaxCount }) {
  useEffect(() => {
    let ignore = false;
    const startFetching = async (count) => {
      await setMaxCount(count);
      fetchUser();
    }
    if (!ignore) {
      startFetching(6);
    }
    return () => { ignore = true; }
  }, [fetchUser, setMaxCount]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default connect(mapState, mapDispatch)(App);
