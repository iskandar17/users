import { getUsersList, getViewLimit } from '../../selectors';

const fetchUser = store => next => async (action) => {
  if (action.type !== 'FETCH_USER') {
    return next(action);
  }

  const OldList = getUsersList(store.getState()).list;
  const limit = getViewLimit(store.getState());
  const newActionCreator = (data) => {
    const setData = () => {
      if (OldList.length >= limit) {
        OldList.splice(0, 1); // use action to store shown users
      }
      if (!data.error) {
        OldList.push(data);
      }

      return OldList;
    };
    const newAction = Object.assign({}, { type: 'UPDATE_LIST', payload: { list: setData() } });

    return newAction;
  };

  // let response;
  let data;
  try {
    // response = await fetch(`https://api.github.com/user/${action.payload}`);
    // data = await response.json();
    data = {
        "login": "mojombo",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/mojombo",
        "html_url": "https://github.com/mojombo",
        "followers_url": "https://api.github.com/users/mojombo/followers",
        "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
        "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
        "organizations_url": "https://api.github.com/users/mojombo/orgs",
        "repos_url": "https://api.github.com/users/mojombo/repos",
        "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
        "received_events_url": "https://api.github.com/users/mojombo/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Tom Preston-Werner",
        "company": null,
        "blog": "http://tom.preston-werner.com",
        "location": "San Francisco",
        "email": null,
        "hireable": null,
        "bio": null,
        "public_repos": 61,
        "public_gists": 62,
        "followers": 21469,
        "following": 11,
        "created_at": "2007-10-20T05:24:19Z",
        "updated_at": "2019-05-08T22:19:55Z"
    };
  } catch (err) {
    data = {
      error: true,
      data: err,
    };
  }
  return next(newActionCreator(data));
};

export default fetchUser;
