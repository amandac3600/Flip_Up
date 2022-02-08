import { connect } from 'react-redux';
import SearchBar from './search_bar'

const mapStateToProps = (state) => ({
  errors: Object.values(state.errors),
})

const mapDispatchToProps = dispatch => ({
  // clearErrors: () => dispatch(clearErrors()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

