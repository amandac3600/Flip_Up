import React from 'react';
import Sparkles from '../study/sparkles';
import { Link } from 'react-router-dom';

const getDecks = (decks) => {
  const decksSlice = Object.values(decks).filter(deck => deck.cards.length >  2).slice(0, 10)
  return decksSlice.map((deck) => {
      return <div key={deck._id} className='deck-form-page-deck-list-item grow3'>
        <Link to={`/decks/${deck._id}`}>
          <div >
            <div>{deck.name}</div>
            <div>{deck.cards.length} cards</div>
          </div>

          <div>
            {deck.category}
          </div>
        </Link>
      </div>
  })
}

const CompeteResults = ({user, friends, game, cards, decks}) => {
  
  let player;
  let friendPlayer;
  if (game.player1Id === user.id) {
    player = 'player1';
    friendPlayer = 'player2';
  } else {
    player = 'player2';
    friendPlayer = 'player1';
  }
  const friend = friends[game[`${friendPlayer}Id`]]
  const friendName = friend.username;

  let winner = game.winner;
  if (winner === friend._id) winner = friendName;
  if (winner === user.id) winner = user.username;
  const winnerDiv = winner ? <Sparkles><div className='compete-winner-div'>{`${winner} won this round!`}</div></Sparkles> : '';

  const friendTime = game[`${friendPlayer}Time`] ? `${(game[`${friendPlayer}Time`] / 60000).toFixed(2)} minutes` : 'In Progress';

  return (
    <div>
      <div className='compete-mode-results-div'>
        <h1 className='compete-results-title'>Challenge Results</h1>
        <table>
          <tbody className='compete-results-table'>
            <tr>
              <th>Results</th>
              <th>Player 1</th>
              <th>Player 2</th>
            </tr>

            <tr>
              <td>Username</td>
              <td>{user.username}</td>
              <td>{friendName}</td>
            </tr>

            <tr>
              <td>Number Correct</td>
              <td>{game[`${player}Correct`]}</td>
              <td>{game[`${friendPlayer}Correct`] || 'In Progress'}</td>
            </tr>

            <tr>
              <td>Number Incorrect</td>
              <td>{cards.length - game[`${player}Correct`]}</td>
              <td>{cards.length - game[`${friendPlayer}Correct`] || 'In Progress'}</td>
            </tr>

            <tr>
              <td>Time</td>
              <td>{`${(game[`${player}Time`] / 60000).toFixed(2)} minutes`}</td>
              <td>{friendTime}</td>
            </tr>
          </tbody>
        </table>

        {winnerDiv}
      </div>

      <div className='deck-form-other-decks-container' >
        <div><div>More Decks to Try</div></div>
        <div className='deck-form-page-deck-list-container'>
          <div className='deck-form-page-deck-list' >
            {getDecks(decks)}
          </div>
        </div>
        <div className='deck-form-page-deck-list-shadow' ></div>
      </div>

    </div>

  )

}

export default CompeteResults;