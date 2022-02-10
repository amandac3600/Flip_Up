import React from 'react';
import NavContainer from '../nav/nav_container';
import Timer from './timer';
import './compete_mode.css'

export default class CompeteMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      playerTime: '',
      playerCorrect: 0,
      currentIndex: 0,
      begin: false,
    }
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleBeginGame = this.handleBeginGame.bind(this);
  }

  componentDidMount() {
    // delete after testing
    this.props.getPendingGames();
    // keep
    this.props.getGame(this.props.match.params.gameId)
      .then((res) => {
        const game = res.game;
        this.setState({game: game});
        Promise.all([this.props.fetchUser(),this.props.getFriends()])
          .then( () => {
            this.props.getCards(game.deck).then((res) => {
              if (game.player1Id === this.props.users.current.id) {
                this.setState({ player: 'player1' ,friendPlayer: 'player2', cards: Object.values(res.cards) })
              } else {
                this.setState({ player: 'player2', friendPlayer: 'player1', cards: Object.values(res.cards) })
              }
            });
          })
      })
  }

  renderAnswers() {
    const cards = this.state.cards.slice();
    let answers = [cards[this.state.currentIndex].back];
    cards.splice(this.state.currentIndex,1);

    while (answers.length < 4) {
      const randomIndex = [Math.floor(Math.random() * cards.length)];
      answers.push(cards[randomIndex].back);
      cards.splice(randomIndex, 1);
    }

    answers = answers.sort();
    return (
      <div className='compete-answer-choices-div'>
        <div className='compete-answer-choices-subdiv'>
          <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[0]}</div>
          <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[1]}</div>
        </div>

        <div className='compete-answer-choices-subdiv'>
          <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[2]}</div>
          <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[3]}</div>
        </div>
      </div>
    )
  }

  handleAnswerClick(e) {
    const answerChoice = e.currentTarget.textContent;
    const correctAnswer = this.state.cards[this.state.currentIndex].back;

    let playerCorrect = this.state.playerCorrect;
    if (answerChoice === correctAnswer) playerCorrect += 1;
    let endTime = '';
    let playerTime = '';
    if(this.state.currentIndex === this.state.cards.length - 1) {
      endTime = Date.now();
      playerTime = endTime - this.state.startTime;
    }

    this.setState({
      playerCorrect: playerCorrect,
      currentIndex: this.state.currentIndex + 1,
      endTime: endTime,
      playerTime: playerTime
    }, () => {
      if (this.state.playerTime) {
        this.props.updateGame(this.state).then(res => {
          this.setState({game: res.game});
        });
      }
    })
  }

  handleBeginGame()  {
    this.setState({ startTime: Date.now(), begin: true });
  }

  renderBegin() {
    return (
      <div >
        <NavContainer />
        <div className='compete-mode-begin'>
          <div className='compete-mode-directions'>The winner will be determined by who gets the most question correct. <br /><br />If there is a tie, whoever finishes in the least amount of time will win.</div>

          <button className='compete-mode-begin-button' onClick={this.handleBeginGame}>Begin Game</button>
        </div>
      </div>
    )
  }

  renderResults() {
    const friendPlayer = this.state.friendPlayer;
    const player = this.state.player;
    let winner = this.state.game.winner;
    const friend = this.props.users.friends[this.state.game[`${friendPlayer}Id`]]
    const friendName = friend.username;

    const friendTime = this.state.game[`${friendPlayer}Time`] ? `${(this.state.game[`${friendPlayer}Time`]/60000).toFixed(2)} minutes` : 'In Progress';

    return (
      <div>
        <NavContainer />
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
                <td>{this.props.users.current.username}</td>
                <td>{friendName}</td>
              </tr>

              <tr>
                <td>Number Correct</td>
                <td>{this.state.game[`${player}Correct`]}</td>
                <td>{this.state.game[`${friendPlayer}Correct`] || 'In Progress'}</td>
              </tr>

              <tr>
                <td>Number Incorrect</td>
                <td>{this.state.cards.length - this.state.game[`${player}Correct`]}</td>
                <td>{this.state.cards.length - this.state.game[`${friendPlayer}Correct`] || 'In Progress'}</td>
              </tr>

              <tr>
                <td>Time</td>
                <td>{`${(this.state.game[`${player}Time`] / 60000).toFixed(2)} minutes`}</td>
                <td>{friendTime}</td>
              </tr>
            </tbody>
          </table>

          <div>{winner ? `${winner} won this round!` : ''}</div>
        </div>
      </div>
    )
  }


  render() {
    if (!this.props.decks || !this.props.users || !this.props.users.friends || !this.props.games || !this.state.cards) return null;

    console.log('render', this.state)
    if (this.state.playerTime || this.state.game[`${this.state.player}Time`]) return this.renderResults();
    if (!this.state.begin) return this.renderBegin();

    if (this.state.cards && this.state.cards.length < 4) 
    return (
      <div>
        <NavContainer />
        Decks must have minimum of 4 cards to use in battle mode.
      </div>
    )
    return (
      <div>
        <NavContainer />

        <Timer />
        <div className='compete-mode-cards'>
          <div className='compete-mode-front'>
            {this.state.cards[this.state.currentIndex].front}
          </div>
          {this.renderAnswers()}
        </div>

      </div>
    );
  }
}