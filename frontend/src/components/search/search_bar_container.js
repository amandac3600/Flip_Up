import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { getDecks, getDeck } from '../../actions/deck_actions';

const mapStateToProps = (state) => ({
  errors: Object.values(state.errors),
})

const mapDispatchToProps = dispatch => ({
  getDecks: (filters) => dispatch(getDecks(filters)),
  getDeck: (deckId) => dispatch(getDeck(deckId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

