import { connect } from 'react-redux';
import CardForm from './card_form';
import { updateCard } from '../../actions/card_actions'

const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    type: 'update'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (card)=>dispatch(updateCard(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);