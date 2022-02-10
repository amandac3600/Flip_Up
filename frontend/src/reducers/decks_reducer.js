import { RECEIVE_DECK, RECEIVE_DECKS, UPDATE_DECK, CREATE_DECK, REMOVE_DECK } from '../actions/deck_actions';
import { CREATE_CARD, REMOVE_CARD } from '../actions/card_actions';
  const DecksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_DECK:
            newState[action.deck.deck._id] = action.deck;
            return newState;
        case RECEIVE_DECKS:
            return action.decks;
        case UPDATE_DECK:
            newState[action.deck._id] = action.deck;
            return newState;
        case CREATE_DECK:
            newState[action.deck._id] = action.deck;
            return newState;
        case REMOVE_DECK:
            console.log('reducer', action)
            delete newState[action.deckId];
            return newState;    
        case CREATE_CARD:
            newState[action.card.deckId].cards.push(action.card._id);
            return newState;
        case REMOVE_CARD:
            // newState[action.card.deckId].cards
            return newState;       
        default:
            return state;
    }
  };
  
  export default DecksReducer;