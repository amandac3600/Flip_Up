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
    .then((res) => (
        dispatch(receiveDeck(res.data))
    ))
);

// filters option. if no filters leave empty
export const getDecks = (filters) => dispatch => {
    return DeckApiUtil.getDecks(filters)
    .then((res) => (
        dispatch(receiveDecks(res.data))
    ))
};

export const getUserDecks = (userId) => dispatch => {
    return DeckApiUtil.getUserDecks(userId)
    .then((res) => (
        dispatch(receiveDecks(res.data))
    ))
};


export const updateDeck = (deck) => dispatch => (
    DeckApiUtil.updateDeck(deck)
    .then((res) => (
        dispatch(editDeck(res.data))
    ))
);


export const createDeck = (deck) => dispatch => (
    DeckApiUtil.createDeck(deck)
    .then((res) => {
        return dispatch(addDeck(res.data))
    })
);


export const deleteDeck = (deckId) => dispatch => (
    DeckApiUtil.deleteDeck(deckId)
    .then(() => (
        dispatch(removeDeck(deckId))
    ))
);

