import { RECEIVE_CARD, RECEIVE_CARDS, UPDATE_CARD, CREATE_CARD, REMOVE_CARD } from '../actions/card_actions';
  
  const cardsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_CARD:
            newState[action.card._id] = action.card;
            return newState;
        case RECEIVE_CARDS:
            return action.cards;
        case UPDATE_CARD:
            newState[action.card._id] = action.card;
            return newState;
        case CREATE_CARD:
            newState[action.card._id] = action.card;
            return newState;
        case REMOVE_CARD:
            delete newState[action.cardId];
            return newState;          
        default:
            return state;
    }
  };
  
  export default cardsReducer;