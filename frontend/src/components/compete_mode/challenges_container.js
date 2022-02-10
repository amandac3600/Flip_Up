import { connect } from 'react-redux';
import Challenges from './challenges';
import { getDeck } from '../../actions/deck_actions';
import { fetchUser, getFriends } from '../../actions/session_actions';
import { getGame, getPendingGames, getCompleteGames, deleteGame} from '../../actions/game_actions';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    games: state.entities.games,
    friends: state.entities.users.friends,
    decks: state.entities.decks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFriends: () => dispatch(getFriends()),
    getDeck: (deckId) => dispatch(getDeck(deckId)),
    fetchUser: () => dispatch(fetchUser()),
    getGame: (gameId) => dispatch(getGame(gameId)),
    getPendingGames: () => dispatch(getPendingGames()),
    getCompleteGames: () => dispatch(getCompleteGames()),
    deleteGame: (gameId) => dispatch(deleteGame(gameId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);