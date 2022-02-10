import axios from 'axios';

//get all decks
export const getDecks = (filters) => {
  if (filters) {
    return axios.get(`/api/decks/search/${filters}`);
  } else {
    return axios.get(`/api/decks/search/`);

  }
};

//get a single deck
export const getDeck = (deckId) => {
  return axios.get(`/api/decks/${deckId}`);
};

//get all decks of that user
export const getUserDecks = (userId) => {
  return axios.get(`/api/decks/user/${userId}`);
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
    return axios.delete(`/api/decks/${deckId}`);
};

