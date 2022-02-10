import React from 'react';
import './challenges.css'
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

export default class Challenges extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPendingGames()
      .then((res) => {
        Object.values(res.games).forEach(
          game => {
            if (!this.props.decks[game.deck]) this.props.getDeck(game.deck);
          }
        )
      });
    this.props.getCompleteGames()
      .then((res) => {
        Object.values(res.games).forEach(
          game => {
            if (!this.props.decks[game.deck]) this.props.getDeck(game.deck);
          }
        )
      });;
    // delete if fetched by profile page
    this.props.fetchCurrentUser();
    this.props.getFriends();
  }

  handleDeleteGame(gameId) {
    return(e) => {
      this.props.deleteGame(gameId)
        .then(() => {
          this.props.getPendingGames();
        });
    }
  }

  renderResults(game, pending) {
    const friendPlayer = game.player1Id === this.props.users.current.id ? 'player2' : 'player1';
    const friendId = game[`${friendPlayer}Id`];
    const friend = this.props.friends[friendId];
    const deck = this.props.decks[game.deck];
    if(!deck || !friend) return '';

    let winner = 'In Progress';
    if (game.winner && game.winner === friend._id) {
      winner = friend.username;
    } else if (game.winner && game.winner !== friend._id) {
      winner = this.props.users.current.username;
    }
    let deleteButton = '';
    if (pending) {
      deleteButton = (<div onClick={this.handleDeleteGame(game._id)} className='challenges-delete-button'>
        <BsTrash />
      </div>)
    }

    return(
      <div className='challenges-request-item-div' key={game._id}>
        <div className='challenges-request-item'>
          <Link to={`/compete/${game._id}`} className='challenges-link'>
            <div>
              <span className='challenges-request-item-title'>Opponent: </span>
              <span className='challenges-request-item-info'>{friend.username}</span>
            </div>
            <div>
              <span className='challenges-request-item-title'>Deck: </span>
              <span className='challenges-request-item-info'>{deck.name}</span>
            </div>
            <div>
              <span className='challenges-request-item-title'>Winner: </span>
              <span className='challenges-request-item-info'>{winner}</span>
            </div>
          </Link>
        </div>
        {deleteButton}
      </div>
    )
  }

  render() {
    if (!this.props.users.current || !this.props.users.friends || !this.props.games || !this.props.games.pending || !this.props.games.complete || !this.props.decks || !this.props.decks) return null;

    const pendingChallenges = Object.values(this.props.games.pending).map(game => this.renderResults(game, true));
    const completeChallenges = Object.values(this.props.games.complete).map(game => this.renderResults(game, false));

    return (
      <div className='challenges-div'>
        <h2 className='challenges-title'>Challenges</h2>

        <div className='challenges-requests-div'>
          <div className='challenges-pending'>
            <div className='challenges-pending-title'>Pending: </div>
            <div className='challenges-pending-list'>{pendingChallenges}</div>
          </div>

          <div className='challenges-complete'>
            <div className='challenges-complete-title'>Complete: </div>
            <div className='challenges-complete-list'>{completeChallenges}</div>
          </div>

        </div>
      </div>
    )
  }
}