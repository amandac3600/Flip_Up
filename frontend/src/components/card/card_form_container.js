import { connect } from 'react-redux';
import CardForm from './card_form';
import { updateCard, createCard } from '../../actions/card_actions'

const mapStateToProps = (state) => {
  return {
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCard: (card)=>dispatch(updateCard(card)),
    createCard: (card)=>dispatch(createCard(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);