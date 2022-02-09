import { RECEIVE_GAME, RECEIVE_PENDING_GAMES, RECEIVE_COMPLETE_GAMES } from '../actions/game_actions';

const gameReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GAME:
      nextState[action.game._id] = action.game;
      return nextState;
    case RECEIVE_PENDING_GAMES:
      nextState['pending'] = action.games;
      return nextState;
    case RECEIVE_COMPLETE_GAMES:
      nextState['complete'] = action.games;
      return nextState;
    default:
      return state;
  }
}

export default gameReducer;