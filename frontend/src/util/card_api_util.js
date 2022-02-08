import axios from 'axios';

//get all cards from deck
export const getCards = (deckId) => {
  return axios.get(`/api/cards/deck/${deckId}`);
};

//get a single card
export const getCard = (cardId) => {
  return axios.get(`/api/cards/${cardId}`);
};

//create a card
export const createCard = (card) => {
    return axios.post(`/api/cards/deck/${card.deckId}`, card);
};

//update a card
export const updateCard = (card) => {
    return axios.post(`/api/cards/${card.id}`, card);
};


//delete a card
export const deleteCard = (cardId) => {
    return axios.delete(`/api/cards/${cardId}`);
};