import React from 'react';
import { withRouter } from 'react-router-dom';
import CardFormContainer from './../card/card_form_container'
import CardIndexContainer from './../card/card_index_container'

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.props.getDeck(this.props.ownProps.match.params.id)
    this.state = { addCard: false }
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
    return (
      this.props.deckInfo ? this.props.deckInfo.deck ?
      <div>
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
      </div>
       : <div></div> : <div></div>
    );
  }
}

export default withRouter(Deck);