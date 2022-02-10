import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { createDeck } from './../../actions/deck_actions'
import { getUserDecks, deleteDeck } from './../../actions/deck_actions'

const mapStateToProps = (state) => {
  return {
    type: 'create',
    currentUser: state.session.user,
    decks: state.entities.decks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (deck)=>dispatch(createDeck(deck)),
    getUserDecks: (userId)=>dispatch(getUserDecks(userId)),
    deleteDeck: (deckId)=>dispatch(deleteDeck(deckId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);