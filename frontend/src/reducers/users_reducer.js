import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_FRIENDS } from "../actions/session_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState['current'] = action.currentUser;
      return nextState;
    case RECEIVE_USER_LOGOUT:
      return {};
    case RECEIVE_FRIENDS:
      nextState['friends'] = action.friends;
      return nextState;
    default:
      return state;
  }
}

export default usersReducer;