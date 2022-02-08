import React from 'react';


class CompeteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player2Id: '',
      deckId: ''
    }
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchUser(),
      this.props.getDecks(),
      this.props.getFriends(),
    ])
    .then()
  }

  render() {
    if (!this.props.decks || !this.props.users || !this.props.games ) return null;
    return (
      <div>
        <div>
          Welcome to competitive mode. Select a friend to challenge and a deck to compete with. By winning you get extra experience points!
        </div>

        <div className='compete-main-friend-list'>
          
        </div>
      </div>
    );
  }
}

export default CompeteForm;