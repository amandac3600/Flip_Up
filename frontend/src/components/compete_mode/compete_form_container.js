import { connect } from 'react-redux';
import CompeteForm from './compete_form';
import { getCards } from '../../actions/card_actions';
import { fetchCurrentUser, getFriends } from '../../actions/session_actions';
import { getDecks, getDeck } from '../../actions/deck_actions';
import { createGame, getGame, getPendingGames, getCompleteGames } from '../../actions/game_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    decks: state.entities.decks,
    cards: state.entities.cards,
    users: state.entities.users,
    games: state.entities.games,
    deckId: ownProps.deckId,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (deckId) => dispatch(getCards(deckId)),
    getFriends: () => dispatch(getFriends()),
    getDecks: (filters) => dispatch(getDecks(filters)),
    getDeck: (deckId) => dispatch(getDeck(deckId)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    createGame: (game) => dispatch(createGame(game)),
    getGame: (gameId) => dispatch(getGame(gameId)),
    getPendingGames: () => dispatch(getPendingGames()),
    getCompleteGames: () => dispatch(getCompleteGames()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompeteForm);