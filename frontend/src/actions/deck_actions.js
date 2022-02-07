import * as DeckApiUtil from '../util/deck_api_util';

export const RECEIVE_DECK = "RECEIVE_DECK";
export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const UPDATE_DECK = "UPDATE_DECK";
export const CREATE_DECK = "CREATE_DECK";
export const REMOVE_DECK = "REMOVE_DECK";


export const receiveDeck = deck => ({
  type: RECEIVE_DECK,
  deck
});

export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
});

export const editDeck = deck => ({
    type: UPDATE_DECK,
    deck
});

export const addDeck = deck => ({
    type: CREATE_DECK,
    deck
});

export const removeDeck = deckId => ({
    type: REMOVE_DECK,
    deckId
});


export const getDeck = deckId => dispatch => (
    DeckApiUtil.getDeck(deckId)
    .then((deck) => (
        dispatch(receiveDeck(deck))
    ))
);

export const getDecks = () => dispatch => (
    DeckApiUtil.getDecks()
    .then((decks) => (
        dispatch(receiveDecks(decks))
    ))
);

export const updateDeck = (deck) => dispatch => (
    DeckApiUtil.updateDeck(deck)
    .then((deck) => (
        dispatch(editDeck(deck))
    ))
);


export const createDeck = (deck) => dispatch => (
    DeckApiUtil.createDeck(deck)
    .then((deck) => (
        dispatch(addDeck(deck))
    ))
);


export const deleteDeck = (deckId) => dispatch => (
    DeckApiUtil.deleteDeck(deckId)
    .then((deckId) => (
        dispatch(removeDeck(deckId))
    ))
);

