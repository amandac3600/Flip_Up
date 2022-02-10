import { connect } from 'react-redux';
import CardIndex from './card_index';
import { getCard, deleteCard, getCards } from './../../actions/card_actions'


const mapStateToProps = (state) => {
  return {
    decks: state.entities.decks,
    cards: state.entities.cards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCard: (id)=> dispatch(getCard(id)),
    deleteCard: (id)=> dispatch(deleteCard(id)),
    getCards: (deckId) => dispatch(getCards(deckId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardIndex);