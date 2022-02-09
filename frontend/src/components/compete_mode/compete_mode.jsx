import React from 'react';
import NavContainer from '../nav/nav_container';
import './compete_mode.css'

export default class CompeteMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: Date.now(),
      endTime: '',
      playerTime: '',
      playerCorrect: 0,
      currentIndex: 0
    }
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  componentDidMount() {
    this.props.getGame(this.props.match.params.gameId)
      .then((res) => {
        const game = res.game;
        this.setState({game: game});
        this.props.fetchUser(game.player1Id);
        this.props.getFriends();
        this.props.getCards(game.deck).then((res) => {
          this.setState({ cards: res.cards})
        });
      })
  }

  renderAnswers() {
    const answerSet = new Set();
    const cards = this.state.cards.slice();
    answerSet.add(cards[this.state.currentIndex].back);
    cards.splice(this.state.currentIndex,1);

    while (answerSet.size < 4) {
      const randomIndex = [Math.floor(Math.random() * cards.length)];
      answerSet.add(cards[randomIndex].back);
      cards.splice(randomIndex, 1);
    }

    const answers = [...answerSet].sort();
    return (
      <div>
        <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[0]}</div>
        <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[1]}</div>
        <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[2]}</div>
        <div className='compete-answer-choice' onClick={this.handleAnswerClick}>{answers[3]}</div>
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
        console.log('after game')
        this.props.updateGame(this.state).then(res => {
          this.setState({game: res.game});
        });
      }
    })
  }

  renderResults() {
    let friendName;
    let friendPlayer;
    let winner = this.state.game.winner;

    if (this.state.game.player1Id === this.props.users.current.id) {
      const friend = this.props.users.friends[this.state.game.player2Id];
      friendName = this.props.users.friends[this.state.game.player2Id].username;
      if (winner === friend._id) winner = friendName;
      friendPlayer = 'player2';
    } else {
      const friend = this.props.users.friends[this.state.game.player1Id];
      friendName = this.props.users.friends[this.state.game.player1Id].username;
      if (winner === friend._id) winner = friendName;
      friendPlayer = 'player1';
    }
    const friendTime = this.state.game[`${friendPlayer}Time`] ? `${this.state.game[`${friendPlayer}Time`]/1000} seconds` : 'In Progress';

    return (
      <div>
        <NavContainer />

        <div>Challenge Over!</div>
        <div className='compete-mode-results-div'>
          <div className='compete-mode-results'>
            <div>
              <span>Player 1: </span>
              <span>{this.props.users.current.username}</span>
            </div>
            <div>
              <span>Number Correct: </span>
              <span>{this.state.playerCorrect}</span>
            </div>
            <div>
              <span>Number Incorrect: </span>
              <span>{this.state.cards.length - this.state.playerCorrect}</span>
            </div>
            <div>
              <span>Time: </span>
              <span>{this.state.playerTime/1000} seconds</span>
            </div>
          </div>

          <div className='compete-mode-results'>
            <div>
              <span>Player 2: </span>
              <span>{friendName}</span>
            </div>
            <div>
              <span>Number Correct: </span>
              <span>{this.state.game[`${friendPlayer}Correct`] || 'In Progress'}</span>
            </div>
            <div>
              <span>Number Incorrect: </span>
              <span>{this.state.cards.length - this.state.game[`${friendPlayer}Correct`] || 'In Progress'}</span>
            </div>
            <div>
              <span>Time: </span>
              <span>{friendTime}</span>
            </div>
          </div>
        </div>

        <div>{winner ? `${winner} won this round!` : ''}</div>
      </div>
    )
  }

  render() {
    if (!this.props.decks || !this.props.users || !this.props.users.friends || !this.props.games || !this.state.cards) return null;

    console.log('render', this.state)

    if (this.state.endTime) return this.renderResults();

    return (
      <div>
        <NavContainer />

        <div className='compete-mode-directions'>The winner will be determined by who gets the most question correct. If there is a tie, whoever finishes in the least amount of time will win.</div>

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