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
      currentCard: 0
    }
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

  renderCard() {

  }
  renderAnswers() {
    const answerSet = new Set();
    const cards = this.state.cards.slice();
    answerSet.add(cards[this.state.currentCard].back);
    cards.splice(this.state.currentCard,1);

    while (answerSet.size < 4) {
      const randomIndex = [Math.floor(Math.random() * cards.length)];
      answerSet.add(cards[randomIndex].back);
      cards.splice(randomIndex, 1);
    }

    const answers = [...answerSet];
    console.log(answers)
    return (
      <div>
        <div>{answers[0]}</div>
        <div>{answers[1]}</div>
        <div>{answers[2]}</div>
        <div>{answers[3]}</div>
      </div>
    )
  }

  render() {
    if (!this.props.decks || !this.props.users || !this.props.users.friends || !this.props.games) return null;
    console.log('render', this.state)
    return (
      <div>
        <NavContainer />

        <div className='compete-mode-directions'>The winner will be determined by who gets the most question correct. If there is a tie, whoever finishes in the least amount of time will win.</div>

        <div className='compete-mode-cards'>
          {this.renderAnswers()}
        </div>
      </div>
    );
  }
}