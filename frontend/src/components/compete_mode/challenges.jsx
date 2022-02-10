import React from 'react';
import './challenges.css'
import { Link } from 'react-router-dom';

export default class Challenges extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPendingGames()
      .then((res) => {
        res.games.forEach(
          game => {
            if (!this.props.decks[game.deck]) this.props.getDeck(game.deck);
          }
        )
      });
    this.props.getCompleteGames()
      .then((res) => {
        res.games.forEach(
          game => {
            if (!this.props.decks[game.deck]) this.props.getDeck(game.deck);
          }
        )
      });;
    // delete if fetched by profile page
    this.props.fetchUser();
    this.props.getFriends();
  }

  renderResults(game) {
    const friendPlayer = game.player1Id === this.props.users.current.id ? 'player2' : 'player1';
    const friendId = game[`${friendPlayer}Id`];
    const friend = this.props.friends[friendId];
    const deck = this.props.decks[game.deck];
    if(!deck || !friend) return '';

    let winner = 'In Progress';
    if (game.winner && game.winner === friend.id) {
      winner = friend.username;
    } else if (game.winner && game.winner !== friend.id) {
      winner = this.props.users.current.username;
    }

    return(
      <div className='challenges-request-item'>
        <Link to={`/compete/${game._id}`}>
          <div>
            <span>Opponent: </span>
            <span>{friend.username}</span>
          </div>
          <div>
            <span>Deck: </span>
            <span>{deck.deck.name}</span>
          </div>
          <div>
            <span>Winner: </span>
            <span>{winner}</span>
          </div>
        </Link>
      </div>
    )
  }

  render() {
    if (!this.props.users.current || !this.props.users.friends || !this.props.games || !this.props.games.pending || !this.props.games.complete) return null;

    const pendingChallenges = Object.values(this.props.games.pending).map(game => this.renderResults(game));
    const completeChallenges = Object.values(this.props.games.complete).map(game => this.renderResults(game));

    return (
      <div className='challenges-div'>
        <div>Challenges</div>

        <div className='challenges-requests-div'>
          <div className='challenges-pending'>
            <div>Pending: </div>
            {pendingChallenges}
          </div>

          <div className='challenges-complete'>
            <div>Complete: </div>
            {completeChallenges}
          </div>

        </div>
      </div>
    )
  }
}