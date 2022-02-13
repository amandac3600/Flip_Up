# Flip Up!

![Flip Up (5)-modified](https://user-images.githubusercontent.com/92603028/153731132-4871019f-eb12-4ba1-a3ab-19a588516b9a.png)


[Flip Up](https://flipup.herokuapp.com/#/) is the first and only competitive flashcard studying platform.  Users can create and share custom decks on any subject and use them to compete with one another.  Users are incentivized to study and learn through experience points from studying and the glory that comes with winning a battle.

## Technologies

- Frontend: JavaScript, React, Redux, Node.js, HTML, CSS,
- Backend: Mongoose, MongoDB, Express.js, Node.js, Validator.js 

## Key Features

### User Auth
Users can create an account, log in, and log out. Users can log in as a demo user to experience the site. 

### CRUD for Flashcards
Users can create, edit, delete, and study flashcards and decks. Users can also mark decks as public or private and can choose categories to tag their decks with subjects for search purposes. 

![image](https://user-images.githubusercontent.com/92603028/153730335-5d6d3e99-e552-420d-a03a-d1fa43047775.png)

### Study Mode
Users can review flashcards by flipping over cards and marking them as correct or incorrect. Based on the user's input, the algorithm will determine how often each flashcard should appear based on spaced-repetition.  Users can also choose to review flashcards sooner than the algorithm designates if desired.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/92603028/153730634-76fc4bd5-d9f2-48bc-8c07-87f1ac258ebd.gif)


### Competitive Mode
Users can challenge their friends to compete against each other using a chosen flashcard deck. After both players have finished their turns, results will be tabulated and displayed, and the winner will receive points. The game is a multiple choice quiz that will be scored based on time and accuracy.

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/92603028/153730902-3eaa5142-2854-4880-9701-16f7d239ffa0.gif)


### User Profile
Users can navigate to their profile to view their friends, created decks, win/loss statistics, and completed and pending challenges.  Users can also change their display emoji and access a form to edit their profile.  Users are also able to view pending friend requests.

<img width="1000" alt="user-profile" src="https://user-images.githubusercontent.com/82063894/153771341-3edb3503-e186-4572-a7c3-77dc3e830404.png">

### CRUD for Friends
Users can send, cancel, receive, approve, and deny friend requests from other users.  Users can also remove friends from their friends list. 

## Code Highlights

Spaced repetition is "a method of reviewing material at systematic intervals...An ideal system of spaced repetition allows you to review the material before it isforgotten, helping you to retain it in your long term memory." We employed this system to save our users' time by allowing them to study in the most efficient way.
``` js
 getTimeDifference(date) {
    let now = new Date();
    let lastReviewed = new Date(date);
    return (Math.abs(now - lastReviewed)/1000)/60
  }

  checkReviewTime(cardId) {
    let date = this.props.cards[cardId].reviewed
    switch (this.props.cards[cardId].count) {
        case 0:
            return true
        case 1:
            return this.getTimeDifference(date) > .5 ? true : false
        case 2:
            return this.getTimeDifference(date) > 1 ? true : false
        case 3:
            return this.getTimeDifference(date) > 10 ? true : false
        case 4:
            return this.getTimeDifference(date) > 60 ? true : false
        case 5:
            return this.getTimeDifference(date) > 1440 ? true : false
        case 6:
            return this.getTimeDifference(date) > 2880 ? true : false
        case 7:
            return this.getTimeDifference(date) > 4320 ? true : false
        case 8:
            return this.getTimeDifference(date) > 7200 ? true : false
        case 9:
            return this.getTimeDifference(date) > 12960 ? true : false
        default:
            break;
    } 
  }
```

This search functionality allows users to search for decks by matching any parts of the deck's name using MongoDB's regex operator.  It also allows users to search for public or their own decks based on category filters.  The search is executed in one transaction to reduce the number of queries to the database.
``` js
router.get('/search/:filters', passport.authenticate('jwt', { session: false }), (req, res) => {
  const filters = req.params.filters.split('+');
  Deck.find({
    $or: [{ name: { $regex: filters.join(' '), $options: "i" }}, {
      $and:
        [{ category: { $in: filters } },
        { $or: [{ public: true }, { user: req.user.id }] }]
    }]})
  .sort({ name: 1 })
    .then(async decks => {
      const payload = {};

      for (let i = 0; i < decks.length; i++) {
        const newDeck = await Object.assign({}, decks[i]._doc);
        const cards = await Card.find({ deck: decks[i].id })
        const cardIds = cards.map(card => card.id)
        newDeck['cards'] = cardIds;
        payload[decks[i].id] = newDeck;
      }

      return res.json(payload)
    })
    .catch(err => res.status(404).json({ nodecksfound: 'No matching decks found' }));
});
```

## Future Improvements
#### Reward System
- Add feature for users to purchase rewards with their earned points to display on their profile
#### Feed
- Add feature for a feed that will notify users if they or their friend finishes studying a deck, completes a battle, or purchases a reward
#### Chat
- Add feature for friends to chat with each other
