import { connect } from 'react-redux';
import Deck from './deck';

const mapStateToProps = (state, ownProps) => {
  return {
    deck: state.entities.decks[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);