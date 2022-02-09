import axios from 'axios';

//get all decks
export const getDecks = () => {
  return axios.get('/api/decks');
};

//get a single deck
export const getDeck = (deckId) => {
  return axios.get(`/api/decks/${deckId}`);
};

//create a deck
export const createDeck = (deck) => {
    return axios.post(`/api/decks/`, deck);
};

//update a deck
export const updateDeck = (deck) => {
    return axios.patch(`/api/decks/${deck.id}`, deck);
};

//delete a deck
export const deleteDeck = (deckId) => {
    return axios.post(`/api/decks/${deckId}`);
};