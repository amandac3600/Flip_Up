import { connect } from 'react-redux';
import CompeteForm from './compete_form';
import { getCards } from '../../actions/card_actions';
import { fetchUser, getFriends } from '../../actions/session_actions';
import { getDecks } from '../../actions/deck_actions';
import { createGame, getGame, getPendingGames, getCompleteGames } from '../../actions/game_actions';

const mapStateToProps = (state) => {
  return {
    decks: state.entities.decks,
    // cards: state.entities.cards,
    users: state.entities.users,
    games: state.entities.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCards: (deckId) => dispatch(getCards(deckId)),
    getFriends: () => dispatch(getFriends()),
    getDecks: () => dispatch(getDecks()),
    fetchUser: (id) => dispatch(fetchUser(id)),
    createGame: (game) => dispatch(createGame(game)),
    getGame: (gameId) => dispatch(getGame(gameId)),
    getPendingGames: () => dispatch(getPendingGames()),
    getCompleteGames: () => dispatch(getCompleteGames()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompeteForm);