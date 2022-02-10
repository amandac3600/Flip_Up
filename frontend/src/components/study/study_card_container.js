import { connect } from 'react-redux';
import StudyCard from './study_card';
import { getDeck } from './../../actions/deck_actions'
import { getCard, updateCard } from './../../actions/card_actions'
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
    updateUser: (id)=>dispatch(updateUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyCard);