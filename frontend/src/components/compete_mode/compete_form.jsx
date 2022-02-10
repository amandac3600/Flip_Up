import React from 'react';
import './compete_form.css'

export default class CompeteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player2Id: '',
      deckId: this.props.deckId,
      errors: '',
      filters: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchCurrentUser(),
      // this.props.getDecks(this.state.filters.join('+')),
      this.props.getFriends(),
    ])
    .then()
  }

  renderFriends() {
    return Object.values(this.props.users.friends).map( friend => {
      return (
        <div key={friend._id} className='compete-form-friend-item'>
          <label>
          
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
            <input type='radio' name='friend' value={friend._id} id={friend._id} onClick={this.handleClick('player2Id')} />
          </label>
        </div>
      )
    })
  }

  handleClick(field) {

    return(e) => {
      this.setState({ [field]: e.currentTarget.id})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createGame(this.state)
      .then((res) => {
        this.props.history.push(`/compete/${res.game._id}`)
      })
      .catch(err => {
        console.log('err', err)
        this.setState({ errors: err })
      })
  }

  handleCurrent() {

  }

  render() {
    if (!this.props.users || !this.props.users.friends || !this.props.games ) return null;
    console.log(this.props.decks)
    return (
      <div className='compete-form-div'>
        <form onSubmit={this.handleSubmit}>
        <div className='compete-form-message'>
          Select a friend below to challenge. Winner earns extra experience points!
        </div>

        <div className='compete-form-friend-div'>
          <div className='compete-form-friend-list'>
            {this.renderFriends()}
          </div>
        </div>

        <button className='compete-form-button'>Challenge Opponent</button>
        <div className='compete-form-errors'>{this.state.errors}</div>
        </form>
      </div>
    );
  }
}