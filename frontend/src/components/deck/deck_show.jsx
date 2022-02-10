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
    this.props.getDeck(this.props.ownProps.match.params.id)
    this.state = { 
      addCard: false }
  }

  getCategories() {
    return this.props.deckInfo.deck.category.map((category, idx)=>{
      return <Link to={`/search/${category}`} key={idx} className='deck-show-cat'>{category}</Link>
    })
  }

  getCardForm() {
    return this.state.addCard ? 
    <CardFormContainer/>
    :
    null
  }

  render() {
    if (!this.props.deckInfo || !this.props.deckInfo.deck) return null;
    return (
      <div className='deck-show-full-page'>
          <NavContainer />
        <div className='deck-show-page'>
          <div className='deck-show-name'>{this.props.deckInfo.deck.name}</div>
          <div className='deck-show-cats'>{this.getCategories()}</div>
          <br/>
          <div >
            <div className='deck-show-study' onClick={()=>this.props.ownProps.history.push(`/decks/${this.props.deckInfo.deck._id}/study`)} >Study Deck</div>
            <br/>
            <div className='deck-show-add' onClick={()=>this.setState({ addCard: true })} >Add Cards</div>
          </div>
          <div className='deck-show-cards'>{this.props.deckInfo.cards.length} cards</div>
          {this.getCardForm()}
          <br/>
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