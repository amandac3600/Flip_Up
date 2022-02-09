import React from 'react';
import { withRouter } from 'react-router-dom';
import CardFormContainer from './../card/card_form_container';
import CardIndexContainer from './../card/card_index_container';
import NavContainer from '../nav/nav_container';
import CompeteFormContainer from '../compete_mode/compete_form_container';


class DeckShow extends React.Component {
  constructor(props) {
    super(props);
    this.props.getDeck(this.props.ownProps.match.params.id)
    this.state = { 
      addCard: false }
  }

  getCategories() {
    return this.props.deckInfo.deck.category.map((category, idx)=>{
      return <span key={idx} >{category} </span>
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
      <div>
          <NavContainer />
        <div>{this.props.deckInfo.deck.name}</div>
        <div>Categories: {this.getCategories()}</div>
        <div>Number of cards: {this.props.deckInfo.cards.length}</div>
        <br/>
        <div>
          <div onClick={()=>this.props.ownProps.history.push(`/decks/${this.props.deckInfo.deck._id}/study`)} >Study</div>
          <br/>
          <div onClick={()=>this.setState({ addCard: true })} >Add Cards</div>
        </div>
        {this.getCardForm()}
        <br/>
        <br/>
        <CardIndexContainer/>
        {this.props.deckInfo.cards.length >= 4 ? <CompeteFormContainer deckId={this.props.match.params.id} history={this.props.history}/> : ''}
      </div>
    );
  }
}

export default withRouter(DeckShow);