import { RECEIVE_DECK, RECEIVE_DECKS, UPDATE_DECK, CREATE_DECK, REMOVE_DECK } from '../actions/deck_actions';
  
  const DecksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_DECK:
            newState[action.deck.id] = action.deck;
            return newState;
        case RECEIVE_DECKS:
            return action.decks;
        case UPDATE_DECK:
            newState[action.deck.id] = action.deck;
            return newState;
        case CREATE_DECK:
            newState[action.deck.id] = action.deck;
            return newState;
        case REMOVE_DECK:
            delete newState[action.commentId];
            return newState;          
        default:
            return state;
    }
  };
  
  export default DecksReducer;