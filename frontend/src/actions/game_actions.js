import * as GameApiUtil from '../util/game_api_util';

export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_PENDING_GAMES = "RECEIVE_PENDING_GAMES";
export const RECEIVE_COMPLETE_GAMES = "RECEIVE_COMPLETE_GAMES";
// export const DELETE_GAME = "DELETE_GAME";
export const RECEIVE_GAME_ERRORS = "RECEIVE_GAME_ERRORS";

const receiveGame = game => ({
  type: RECEIVE_GAME,
  game
});

const receivePendingGames = (games) => ({
  type: RECEIVE_PENDING_GAMES,
  games
});

const receiveCompleteGames = games => ({
  type: RECEIVE_COMPLETE_GAMES,
  games
});

// const deleteGame = (gameId) => ({
//   type: DELETE_GAME,
//   gameId
// });

const receiveErrors = (errors) => ({
  type: RECEIVE_GAME_ERRORS,
  errors
});

export const getGame = gameId => dispatch => (
  GameApiUtil.getGame(gameId).then((game) => (
    dispatch(receiveGame(game.data))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const getPendingGames = () => dispatch => (
  GameApiUtil.getPendingGames().then((games) => (
    dispatch(receivePendingGames(games.data))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const getCompleteGames = () => dispatch => (
  GameApiUtil.getCompleteGames().then((games) => (
    dispatch(receiveCompleteGames(games.data))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const createGame = (game) => dispatch => (
  GameApiUtil.createGame(game).then((game) => (
    dispatch(receiveGame(game.data))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);
