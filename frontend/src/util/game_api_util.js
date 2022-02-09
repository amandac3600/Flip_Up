import axios from 'axios';

//find single game
export const getGame = (gameId) => {
  return axios.get(`/api/games/find/${gameId}`);
};

//get pending games for user
export const getPendingGames = () => {
  return axios.get('/api/games/pending');
};

//get completed games for user
export const getCompleteGames = () => {
  return axios.get(`/api/games/complete`);
};

// create game
export const createGame = (game) => {
  return axios.post(`/api/games/`, game);
};

//update a game
export const updateGame = (game) => {
  return axios.patch(`/api/games/${game.id}`, game);
};

// //delete a game
// export const deleteGame = (gameId) => {
//   return axios.delete(`/api/cards/${gameId}`);
// };