import React from 'react';
import PropTypes from 'prop-types';

const GetChild = ({ list }) => list.map(item => (
  <li key={item.id}>
    <div><img src={item.avatar_url} alt={item.login} /></div>
    <div className="name">{item.login}</div>
    <div>{item.id}</div>
  </li>
));

const List = ({ list }) => (
  <ul className="view-list">
    <GetChild list={list} />
  </ul>
);

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

List.defaultProps = {
  list: [],
};

export default List;
