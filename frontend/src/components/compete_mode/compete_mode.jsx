import React from 'react';
import NavContainer from '../nav/nav_container';
import Timer from './timer';
import './compete_mode.css'
import CompeteResults from './compete_results';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

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
    this.props.getDecks();
    this.props.getGame(this.props.match.params.gameId)
      .then((res) => {
        const game = res.game;
        this.setState({game: game});
        Promise.all([this.props.fetchCurrentUser(),this.props.getFriends()])
          .then( () => {
            this.props.getCards(game.deck).then((res) => {
              if (game.player1Id === this.props.users.current.id) {
                this.setState({ cards: Object.values(res.cards), player: 'player1' })
              } else {
                this.setState({ cards: Object.values(res.cards), player: 'player2' })
              }
            });
          })
      })
  }

  handleAnswerClick(e) {
    const emojiCodes = [128011, 128025, 128031, 128032, 128033, 128044, 128051];
    const randomEmoji = emojiCodes[Math.floor(Math.random() * emojiCodes.length)];
    const emojiDiv = document.createElement('div');

    emojiDiv.setAttribute('class', 'fish-emoji');
    emojiDiv.setAttribute('id', 'fish-emoji');
    emojiDiv.innerHTML = `&#${randomEmoji};`;
    emojiDiv.style.top = `${Math.random()*85}%`;
    const competeDiv = document.querySelector('.compete-mode-div');
    competeDiv.insertBefore(emojiDiv, competeDiv.firstChild);
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
        <div className='compete-mode-begin'>
          <div className='compete-mode-directions'>The winner will be determined by who gets the most question correct. <br /><br />If there is a tie, whoever finishes in the least amount of time will win.</div>

          <button className='compete-mode-begin-button' onClick={this.handleBeginGame}>Begin Game</button>
        </div>
      </div>
    )
  }

  renderCompeteMode() {
    return (
      <div className='compete-mode-total-container' >
        <Timer />
        <div className='compete-mode-cards'>
          <div className='compete-mode-front'>
            {this.state.cards[this.state.currentIndex].front}
          </div>
          {this.renderAnswers()}
        </div>
      </div>
    )
  }

  renderAnswers() {
    const cards = this.state.cards.slice();
    let answers = [cards[this.state.currentIndex].back];
    cards.splice(this.state.currentIndex, 1);

    while (answers.length < 4) {
      const randomIndex = [Math.floor(Math.random() * cards.length)];
      answers.push(cards[randomIndex].back);
      cards.splice(randomIndex, 1);
    }

    answers = answers.sort();
    return (
      <div className='compete-answer-choices-div'>
        <div className='compete-answer-choices-subdiv'>
        <AwesomeButton  className='compete-answer-choice compete-quiz-button' type="primary"  ><span className='compete-answer-choice-span' onClick={this.handleAnswerClick} >{answers[0]}</span></AwesomeButton>
          <AwesomeButton className='compete-answer-choice compete-quiz-button' type="primary"><span className='compete-answer-choice-span' onClick={this.handleAnswerClick} >{answers[1]}</span></AwesomeButton>
        </div>

        <div className='compete-answer-choices-subdiv'>
        <AwesomeButton className='compete-answer-choice compete-quiz-button' type="primary"><span className='compete-answer-choice-span' onClick={this.handleAnswerClick} >{answers[2]}</span></AwesomeButton>
        <AwesomeButton className='compete-answer-choice compete-quiz-button' type="primary" ><span className='compete-answer-choice-span' onClick={this.handleAnswerClick} >{answers[3]}</span></AwesomeButton>
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.decks || !this.props.users || !this.props.users.friends || !this.props.games || !this.state.cards) return null;

    let display;
    if (!this.state.begin) display = this.renderBegin();
    if (this.state.playerTime || this.state.game[`${this.state.player}Time`]) {
      display = <CompeteResults user={this.props.users.current} friends={this.props.users.friends} game={this.state.game} cards={this.state.cards}decks={this.props.decks} />
    };

    if (this.state.cards && this.state.cards.length < 4) 
      display = (<div className='compete-minimum'>
        Decks must have minimum of 4 cards to use in battle mode. Please select a different deck.
      </div>);

    display ||= this.renderCompeteMode();
    return (
      <div className='compete-mode-div'>
        <NavContainer />
        <div className='compete-mode-answer-cards-timer' >
          {display}
        </div>
      </div>
    );
  }
}