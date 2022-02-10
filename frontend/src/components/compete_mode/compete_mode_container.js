import { connect } from 'react-redux';
import CompeteMode from './compete_mode';
import {getCards} from '../../actions/card_actions';
import { getDecks, getDeck, getUserDecks } from '../../actions/deck_actions';
import { fetchCurrentUser, getFriends } from '../../actions/session_actions';
import { createGame, getGame, getPendingGames, getCompleteGames, updateGame } from '../../actions/game_actions';

const mapStateToProps = (state) => {
  return {
    decks: state.entities.decks,
    cards: state.entities.cards,
    users: state.entities.users,
    games: state.entities.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (deckId) => dispatch(getCards(deckId)),
    getFriends: () => dispatch(getFriends()),
    getDecks: (filters) => dispatch(getDecks(filters)),
    getUserDecks: (userId) => dispatch(getUserDecks(userId)),
    getDeck: (deckId) => dispatch(getDeck(deckId)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    createGame: (game) => dispatch(createGame(game)),
    getGame: (gameId) => dispatch(getGame(gameId)),
    getPendingGames: () => dispatch(getPendingGames()),
    getCompleteGames: () => dispatch(getCompleteGames()),
    updateGame: (game) => dispatch(updateGame(game))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompeteMode);