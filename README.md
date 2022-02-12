# Flip Up!

Flip Up is the first and only competitive flashcard studying platform.  Users can create and share custom decks on any subject and use them to compete with one another.  Users are incentivized to study and learn through experience points from studying and the glory that comes with winning a battle.

## Technologies

- Frontend: JavaScript, React, Redux, Node.js, HTML, CSS,
- Backend: Mongoose, MongoDB, Express.js, Node.js, Validator.js 

## Key Features

### User Auth
Users can create an account, log in, and log out. Users can log in as a demo user to experience the site. 

### CRUD for Flashcards
Users can create, edit, delete, and study flashcards and decks. Users can also mark decks as public or private and can choose categories to tag their decks with subjects for search purposes. 

### Study Mode
Users can review flashcards by flipping over cards and marking them as correct or incorrect. Based on the user's input, the algorithm will determine how often each flashcard should appear based on spaced-repetition.

### Competitive Mode
Users can challenge their friends to compete against each other using a chosen flashcard deck. After both players have finished their turns, results will be tabulated and displayed, and the winner will receive points. The game is a multiple choice quiz that will be scored based on time and accuracy.

### User Profile
Users can navigate to their profile to view their friends, created decks, win/loss statistics, and completed and pending challenges.  Users can also change their display emoji and access a form to edit their profile.  Users are also able to view pending friend requests.

### CRUD for Friends
Users can send, cancel, receive, approve, and deny friend requests from other users.  Users can also remove friends from their friends list. 

## Code Highlights

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

## Future Improvements
#### Reward System
- Add feature for users to purchase rewards with their earned points to display on their profile
#### Feed
- Add feature for a feed that will notify users if they or their friend finishes studying a deck, completes a battle, or purchases a reward
#### Chat
- Add feature for friends to chat with each other
