import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { updateDeck, createDeck } from './../../actions/deck_actions'

const mapStateToProps = (state) => {
  return {
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDeck: (deck)=>dispatch(updateDeck(deck)),
    createDeck: (deck)=>dispatch(createDeck(deck)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);