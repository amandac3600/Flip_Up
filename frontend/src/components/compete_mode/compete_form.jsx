import React from 'react';
import './compete_form.css'
import NavContainer from '../nav/nav_container'

class CompeteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player2Id: '',
      deckId: '',
      errors: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchUser(),
      this.props.getDecks(),
      this.props.getFriends(),
    ])
    .then()
  }

  renderFriends() {
    return Object.values(this.props.users.friends).map( friend => {
      return (
        <div key={friend._id} className='compete-main-friend-item' id={friend._id} onClick={this.handleClick('player2Id')}>
          <div>
            <span>Username:</span>
            <span>{friend.username}</span>
          </div>
          <div>
            <span>Points:</span>
            <span>{friend.points}</span>
          </div>
          <div>
            <span>Wins:</span>
            <span>{}</span>
          </div>
          <div>
            <span>Losses:</span>
            <span></span>
          </div>
        </div>
      )
    })
  }

  renderDecks() {
    return Object.values(this.props.decks).map( deck => {
      if (!deck.cards.length) return '';
      return (
        <div key={deck._id} className='compete-main-deck-item' id={deck._id} onClick={this.handleClick('deckId')}>
          <div>
            <span>Name: </span>
            <span>{deck.name}</span>
          </div>
          <div>
            <span>Categories: </span>
            <span>{deck.category ? deck.category.join(', ') : 'None'}</span>
          </div>
          <div>
            <span>Number of Cards: </span>
            <span>{deck.cards.length}</span>
          </div>
        </div>
      )
    })
  }

  handleClick(field) {

    return(e) => {
      this.setState({ [field]: e.currentTarget.id})
    }
  }

  handleSubmit() {
    console.log('submit')
    this.props.createGame(this.state)
      .then((res) => {
        this.props.history.push(`/compete/${res.game._id}`)
      })
      .catch(err => {
        console.log('err', err)
        this.setState({ errors: err })
      })
  }

  render() {
    if (!this.props.decks || !Object.keys(this.props.decks).length || !this.props.users || !this.props.users.friends || !this.props.games ) return null;
    console.log('render', this.state)
    return (
      <div className='compete-main-div'>
        <NavContainer />
        <div>
          Welcome to competitive mode. Select a friend to challenge and a deck to compete with. By winning you get extra experience points!
        </div>

        <div className='compete-main-form'>
          <div className='compete-main-friend-list'>
            {this.renderFriends()}
          </div>

          <div className='compete-main-deck-list'>
            {this.renderDecks()}
          </div>
        </div>

        <button onClick={this.handleSubmit}>Challenge Opponent</button>
        <div className='compete-main-form-errors'>{this.state.errors}</div>
      </div>
    );
  }
}

export default CompeteForm;