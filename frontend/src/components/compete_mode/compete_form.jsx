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
      this.props.getFriends(),
    ])
    .then()
  }

  changeColor(id) {
    Object.values(this.props.users.friends).map( friend => {
      document.getElementById(`${friend.id}`).style.backgroundColor = ""
      document.getElementById(`${friend.id}`).style.color = "black"
    })
    document.getElementById(`${id}`).style.backgroundColor = "#28399b"
    document.getElementById(`${id}`).style.color = "white"

  }


  renderFriends() {
    return Object.values(this.props.users.friends).map( friend => {

      return (
        <div key={friend.id} id={friend.id} className='compete-form-friend-item' onClick={()=>{this.changeColor(friend.id)}} >
          <label>
            <div className='compete-form-select'>
              <input type='radio' name='friend' className='compete-form-radio' value={friend.id} id={friend.id} onClick={this.handleClick('player2Id')} />
              <span className='compete-form-username'>Username: </span>
              <span>{friend.username}</span>
            </div>
            <div className='compete-form-points-container'>
              <span className='compete-form-points'>Points: </span>
              <span>{friend.points}</span>
            </div>
            <div className='compete-form-wins-losses'>
              <span>Wins: {this.props.users.friends[friend.id].wins.length}</span>
              <span className='compete-form-losses'>Losses: {this.props.users.friends[friend.id].losses.length}</span>
            </div>
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
        this.setState({ errors: err })
      })
  }

  handleCurrent() {
    if (this.props.decks[this.props.deckId].user === this.props.currentUser.id) {
      return 'compete-form-div-user'
    } else {
      return 'compete-form-div'
    }
  }
  

  render() {
    if (!this.props.users || !this.props.users.friends || !this.props.games ) return null;

    return (
      <div className={this.handleCurrent()}>
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