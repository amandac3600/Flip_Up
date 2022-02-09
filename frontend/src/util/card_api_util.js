import axios from 'axios';

//get all cards
export const getCards = () => {
  return axios.get('/api/cards');
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
    return axios.patch(`/api/cards/${card._id}`, card);
};


//delete a card
export const deleteCard = (cardId) => {
    return axios.delete(`/api/cards/${cardId}`);
};