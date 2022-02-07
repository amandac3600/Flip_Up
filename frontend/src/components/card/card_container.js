import { connect } from 'react-redux';
import Card from './card';

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.entities.users,
    card: state.entities.cards[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);