import React from 'react';
import { withRouter } from 'react-router-dom';
import CardFormContainer from './../card/card_form_container';
import CardIndexContainer from './../card/card_index_container';
import NavContainer from '../nav/nav_container';
import CompeteFormContainer from '../compete_mode/compete_form_container';
import { Link } from 'react-router-dom';
import "./deck_show.css"

class DeckShow extends React.Component {
  constructor(props) {
    super(props);
    this.props.getDeck(this.props.ownProps.match.params.id).then((res) => this.props.fetchUser(res.deck.user))
    this.state = { 
      addCard: false }
    this.handleDeleteDeck = this.handleDeleteDeck.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getCategories() {
    return this.props.deckInfo.category.map((category, idx)=>{
      return <Link to={`/search/${category}`} key={idx} className='deck-show-cat'>{category}</Link>
    })
  }

  getCardForm() {
    return this.state.addCard ? 
    <CardFormContainer/>
    :
    null
  }

  handleDeleteDeck() {
    this.props.deleteDeck(this.props.match.params.id).then((res) => {
      this.props.history.push('/')
    })
  }

  handleEditDeck() {
    if (this.props.deckInfo.user === this.props.currentUser.id) {
      return (
        <div>
        <div onClick={this.handleDeleteDeck} className='deck-show-delete-deck'>Delete Deck</div>
        <br/>
          <div className='deck-show-edit-deck'><Link to={`/decks/${this.props.match.params.id}/edit`}>Edit Deck</Link></div>
        <br/>
        <div className='deck-show-add' onClick={()=>this.setState({ addCard: true })} >Add Cards</div>
        {this.getCardForm()}
        </div>
      )
    }
  }

  handleShowUser() {
    if (!this.props.users) return null;
    if (!this.props.deckInfo.user) return null;
    if (!this.props.users[this.props.deckInfo.user]) return null;
    if (this.props.deckInfo.user !== this.props.currentUser.id) {
      // console.log(this.props.users[this.props.deckInfo.deck.user].username)
      // console.log(this.props.users)
      return <div className='deck-show-user-container'>
        <img className='deck-show-user-pic' src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
        <div className='deck-show-user-name'>
          {this.props.users[this.props.deckInfo.user].username}
        </div>
        </div>
    }
  }

  render() {
    if (!this.props.deckInfo || !this.props.deckInfo) return null;
    // console.log(this.props.fetchUser(this.props.deckInfo.deck.user).then(user => console.log(user.user.username)))  
    // console.log(this.props.deckInfo.deck.user !== this.props.currentUser.id)
    // console.log(this.handleShowUser())
    return (
      <div className='deck-show-full-page'>
          <NavContainer />
        <div className='deck-show-page'>
          <div className='deck-show-name'>{this.props.deckInfo.name}</div>
          <div className='deck-show-cats'>{this.getCategories()}</div>
          <div className='deck-show-cards'>{this.props.deckInfo.cards.length} cards</div>
          <br/>
          <div className='deck-show-study' onClick={()=>this.props.ownProps.history.push(`/decks/${this.props.deckInfo._id}/study`)} >Study Deck</div>
          <div>
            <div>{this.handleShowUser()}</div>
          </div>
          <div>{this.handleEditDeck()}</div>
          <br/>
          <div>
            {this.props.deckInfo.cards.length >= 4 ? <CompeteFormContainer deckId={this.props.match.params.id} history={this.props.history}/> : ''}
          </div>
          
          <CardIndexContainer/>
          
        </div>

      </div>
    );
  }
}

export default withRouter(DeckShow);