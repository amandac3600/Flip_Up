import React from 'react';
import { withRouter } from 'react-router-dom';
import "./card_index.css";
import {BsTrash} from 'react-icons/bs';

class CardIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.getCards(this.props.match.params.id)
      .then(this.setState({ loading: false}))
  }

  handleDelete() {
    let key = Object.keys(this.props.decks)[0]
    if (!this.props.decks[key].deck) return null
    if (this.props.decks[key].deck.user === this.props.currentUser.id) {
      return 'show'    
    } else {
      return 'hidden'
    }
  }

  getCards() {
    const cards = Object.values(this.props.cards);
    if (!cards.length) return 'No cards in deck';

    return cards.map(card=>{
      
      return <div key={card._id} style={{display: 'flex'}} className='card-index-container'>
                <div className='card-index-card'>
                  <div className='card-index-front' >Front: 
                    <div className='card-index-front-body'>
                      {card.front}
                    </div>
                  </div>
                  <div className='card-index-back' >Back: 
                    <div className='card-index-back-body'>
                      {card.back}
                    </div>
                  </div>
                  
                </div>
                
                  <div className='card-index-delete' id={this.handleDelete()} onClick={()=>this.props.deleteCard(card._id)} ><BsTrash/></div>
              </div>
    })
  }

  render() {
    if (this.state.loading) return null;
    return (
      <div>
        {this.getCards()}
      </div>
    );
  }
}

export default withRouter(CardIndex);
