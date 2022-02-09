import React from 'react';
import NavContainer from '../nav/nav_container';
import './compete_mode.css'

export default class CompeteMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      playerTime: '',
      playerCorrect: '',
    }
  }

  componentDidMount() {
    this.props.getGame(this.props.match.params.gameId)
      .then((res) => {
        this.props.getDeck(res.game.deck)
        this.props.fetchUser(res.game.player1Id)
        this.props.getFriends()
      })
  }


  render() {
    if (!this.props.decks || !this.props.users || !this.props.users.friends || !this.props.games) return null;
    console.log('render', this.state)
    return (
      <div>
        <NavContainer />

        <div className='compete-mode-directions'>The winner will be determined by who gets the most question correct. If there is a tie, whoever finishes in the least amount of time will win.</div>
        
      </div>
    );
  }
}