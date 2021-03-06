import * as CardApiUtil from '../util/card_api_util';

export const RECEIVE_CARD = "RECEIVE_CARD";
export const RECEIVE_CARDS = "RECEIVE_CARDS";
export const UPDATE_CARD = "UPDATE_CARD";
export const CREATE_CARD = "CREATE_CARD";
export const REMOVE_CARD = "REMOVE_CARD";


export const receiveCard = card => ({
  type: RECEIVE_CARD,
  card
});

export const receiveCards = cards => ({
    type: RECEIVE_CARDS,
    cards
});

export const editCard = card => ({
    type: UPDATE_CARD,
    card
});

export const addCard = card => ({
    type: CREATE_CARD,
    card
});

export const removeCard = cardId => ({
    type: REMOVE_CARD,
    cardId
});


export const getCard = cardId => dispatch => (
    CardApiUtil.getCard(cardId)
    .then((res) => (
        dispatch(receiveCard(res.data))
    ))
);

export const getCards = (deckId) => dispatch => (
    CardApiUtil.getCards(deckId)
    .then((res) => (
        dispatch(receiveCards(res.data))
    ))
);

export const updateCard = (card) => dispatch => {
    return CardApiUtil.updateCard(card)
    .then((res) => {
        return dispatch(editCard(res.data))
    })
}

export const createCard = (card) => dispatch => (
    CardApiUtil.createCard(card)
    .then((res) => {
        res.data.deckId = card.deckId
        return dispatch(addCard(res.data))
    })
);


export const deleteCard = (cardId) => dispatch => (
    CardApiUtil.deleteCard(cardId)
    .then(() => (
        dispatch(removeCard(cardId))
    ))
);

