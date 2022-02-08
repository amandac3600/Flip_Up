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
    return axios.post(`/api/cards/`, card);
};

//update a card
export const updateCard = (card) => {
    return axios.post(`/api/cards/${card.id}`, card);
};


//delete a card
export const deleteCard = (cardId) => {
    return axios.post(`/api/cards/${cardId}`);
};