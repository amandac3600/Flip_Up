import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { updateDeck } from './../../actions/deck_actions'

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.entities.users,
    card: state.entities.cards[ownProps.match.params.id],
    type: 'update'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (deck)=>dispatch(updateDeck(deck)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);