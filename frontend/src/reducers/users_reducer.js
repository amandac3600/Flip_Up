import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, UPDATE_USER } from "../actions/session_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState[action.currentUser.id] = action.currentUser;
      return nextState;
    case UPDATE_USER:
            nextState[action.user._id] = action.user;
            return nextState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default usersReducer;