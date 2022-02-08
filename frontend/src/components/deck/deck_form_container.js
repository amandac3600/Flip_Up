import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { createDeck } from './../../actions/deck_actions'

const mapStateToProps = (state) => {
  return {
    type: 'create'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (deck)=>dispatch(createDeck(deck)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);