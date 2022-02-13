import * as SessionApiUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const UPDATE_USER = "UPDATE_USER";
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});
export const receiveFriends = friends => ({
  type: RECEIVE_FRIENDS,
  friends
});
export const receiveSearch = users => ({
  type: RECEIVE_SEARCH,
  users
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => (
  SessionApiUtil.signup(user).then(() => (
    dispatch(receiveUserSignIn())
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const login = user => dispatch => {
  return (SessionApiUtil.login(user).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    SessionApiUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
  )
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  SessionApiUtil.setAuthToken(false)
  dispatch(logoutUser())
};

export const fetchCurrentUser = () => dispatch => (
  SessionApiUtil.fetchCurrentUser() 
    .then(user => (
      dispatch(receiveCurrentUser(user.data))
    ), err => (
      dispatch(receiveErrors(err.response.data))
    ))
)

export const fetchUser = (userId) => dispatch => (
  SessionApiUtil.fetchUser(userId) 
    .then(user => (
      dispatch(receiveUser(user.data))
    ), err => (
      dispatch(receiveErrors(err.response.data))
    ))
)

export const fetchUsers = (keyword) => dispatch => (
  SessionApiUtil.fetchUsers(keyword) 
    .then(users => (
      dispatch(receiveSearch(users.data))
    ), err => (
      dispatch(receiveErrors(err.response.data))
    ))
)

export const getFriends = () => dispatch => (
  SessionApiUtil.getFriends()
    .then(friends => (
      dispatch(receiveFriends(friends.data))
    ), err => (
      dispatch(receiveErrors(err.response.data))
    ))
)

export const updateUser = data => dispatch => {
  return SessionApiUtil.editUser(data)
    .then(user => (
      dispatch(receiveCurrentUser(user.data)))
    , err=> (
      dispatch(receiveErrors(err.response.data))
    ))
};

export const requestFriend = friendData => dispatch => {
  return SessionApiUtil.requestFriend(friendData)
    .then(user => (
      dispatch(receiveCurrentUser(user.data))
    ), err=> (
      dispatch(receiveErrors(err.response.data))
    ))
};

export const removeFriend = friendData => dispatch => {
  return SessionApiUtil.removeFriend(friendData)
    .then(user => (
      dispatch(receiveCurrentUser(user.data))
    ), err=> (
      dispatch(receiveErrors(err.response.data))
    ))
};


// export const updateProfilePic = data => dispatch => {
//   SessionApiUtil.updateProfilePic(data)
//     .then(user => (
//       dispatch(receiveCurrentUser(user))
//     ), err=> (
//       dispatch(receiveErrors(err.response.data))
//     ))
// }

