import React from 'react';
import { withRouter } from 'react-router-dom';
import "./card_index.css";
import {BsTrash} from 'react-icons/bs';

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
        return <div key={key} style={{display: 'flex'}} className='card-index-container'>
                  <div className='card-index-card'>
                    <div className='card-index-front' >Front: 
                      <div className='card-index-front-body'>
                        {this.props.cards[key].front}
                      </div>
                    </div>
                    <div className='card-index-back' >Back: 
                      <div className='card-index-back-body'>
                        {this.props.cards[key].back}
                      </div>
                    </div>
                    
                  </div>
                    <div className='card-index-delete' onClick={()=>this.props.deleteCard(key)} ><BsTrash/></div>
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