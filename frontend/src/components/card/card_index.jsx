import React from 'react';
import { withRouter } from 'react-router-dom';

class CardIndex extends React.Component {
  constructor(props) {
    super(props);
    this.cards = this.props.decks[this.props.match.params.id].cards
    this.cards.map((id)=>{
        this.props.getCard(id)
    })
  }

  getCards() {
      return Object.keys(this.props.cards).map((key)=>{
        return <div key={key} style={{display: 'flex'}} >
                    <div style={{width: '150px'}} >Front: {this.props.cards[key].front}</div>
                    <div style={{width: '150px'}} >Back: {this.props.cards[key].back}</div>
                    <div onClick={()=>this.props.deleteCard(key)} >Delete</div>
            </div>
      })
  }

  render() {
    return (
      <div>
        {this.getCards()}
      </div>
    );
  }
}

export default withRouter(CardIndex);