import { connect } from 'react-redux';
import DeckShow from './deck_show';
import { getDeck } from './../../actions/deck_actions'


const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    deckInfo: state.entities.decks[ownProps.match.params.id],
    ownProps,
    decks: state.entities.decks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeck: (id)=>dispatch(getDeck(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckShow);