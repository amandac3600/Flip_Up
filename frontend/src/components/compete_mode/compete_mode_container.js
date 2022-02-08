import { connect } from 'react-redux';
import CompeteMode from './compete_mode';
import {getCards} from '../../actions/card_actions';
import { getDecks } from '../../actions/deck_actions';

const mapStateToProps = (state) => {
  return {
    decks: state.entities.decks,
    cards: state.entities.cards,
    users: state.entities.users,
    games: state.entities.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (deckId) => dispatch(getCards(deckId)),
    getDecks: () => dispatch(getDecks()),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompeteMode);