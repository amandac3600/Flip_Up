import { connect } from 'react-redux';
import SearchResultIndex from './search_result_index';
import { getDecks, getDeck } from '../../actions/deck_actions';

const mapStateToProps = (state) => {
  return {
    decks: state.entities.decks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDecks: (filters) => dispatch(getDecks(filters)),
    getDeck: (deckId) => dispatch(getDeck(deckId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultIndex);
