import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { updateDeck, deleteDeck, getUserDecks } from './../../actions/deck_actions'
import { fetchCurrentUser } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    deck: state.entities.decks[ownProps.match.params.id],
    type: 'update'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (deck)=>dispatch(updateDeck(deck)),
    deleteDeck: (deckId) => dispatch(deleteDeck(deckId)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    getUserDecks: (userId) => dispatch(getUserDecks(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);