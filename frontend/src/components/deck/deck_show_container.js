import { connect } from 'react-redux';
import DeckShow from './deck_show';
import { deleteDeck, getDeck, getUserDecks } from './../../actions/deck_actions'
import { fetchUser } from '../../actions/session_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    deckInfo: state.entities.decks[ownProps.match.params.id],
    ownProps,
    decks: state.entities.decks,
    currentUser: state.session.user,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeck: (id)=>dispatch(getDeck(id)),
    deleteDeck: (deckId) => dispatch(deleteDeck(deckId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    // getUserDecks: (userId) => dispatch(getUserDecks(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckShow);