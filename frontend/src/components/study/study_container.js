import { connect } from 'react-redux';
import Study from './study';
import { getDeck, getUserDecks } from './../../actions/deck_actions'
import { getCard, updateCard, getCards } from './../../actions/card_actions'
import { updateUser } from './../../actions/session_actions'


const mapStateToProps = (state) => {
  return {
    decks: state.entities.decks,
    cards: state.entities.cards,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeck: (id)=>dispatch(getDeck(id)),
    getCard: (id)=>dispatch(getCard(id)),
    updateCard: (card)=>dispatch(updateCard(card)),
    updateUser: (user)=>dispatch(updateUser(user)),
    getUserDecks: (userId)=>dispatch(getUserDecks(userId)),
    getCards: (deckId)=>dispatch(getCards(deckId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Study);