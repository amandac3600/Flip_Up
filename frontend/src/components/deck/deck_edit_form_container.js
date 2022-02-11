import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { updateDeck } from './../../actions/deck_actions'
import { getUserDecks, deleteDeck } from './../../actions/deck_actions'

const mapStateToProps = (state, ownProps) => {
  let myDeck
  Object.keys(state.entities.decks).map((key)=>{
    if (state.entities.decks[key]._id === ownProps.match.params.id) {
      myDeck = state.entities.decks[key]
    }
  })
  return {
    deck: myDeck,
    type: 'update',
    currentUser: state.session.user,
    decks: state.entities.decks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDecks: (userId)=>dispatch(getUserDecks(userId)),
    submit: (deck)=>dispatch(updateDeck(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);