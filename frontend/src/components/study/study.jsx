import React from 'react';
import { withRouter } from 'react-router-dom';
import "./study.css";
import StudyCardContainer from './study_card_container';
import NavContainer from '../nav/nav_container';
import ExperienceBarContainer from './../experience_bar/experience_bar_container'


class Study extends React.Component {
  constructor(props) {
    super(props); 
    this.props.getUserDecks(this.props.currentUser.id)
  }
  
  getDeckCategories(deckId) {
    if (!this.props.decks[deckId].category) return
    return this.props.decks[deckId].category.map((category, idx)=>{
      return <div key={idx} >
                <div>{category}</div>
            </div>
    })
  }
  
  getNumberOfCards(deckId) {
  }

  moveToNextDeck(key) {
    this.props.location.pathname = ""
    this.props.history.push(`decks/${this.props.decks[key]._id}/study`)
  }

  getEachDeck() {
    if (!document.getElementById('study-page-deck-list-shadow')) return
    let counter = 0;
    let div = Object.keys(this.props.decks).slice(0).reverse().map((key, idx)=>{
      if (this.props.decks[key]._id !== this.props.match.params.id && this.props.decks[key].cards.length > 0) {
        counter += 1
        return <div key={key} className='study-page-deck-list-item grow3' onClick={()=>this.moveToNextDeck(key)} >
                <div >
                  <div>{this.props.decks[key].name}</div>
                  <div>{this.getNumberOfCards(key)}</div>
                </div>
                <div>
                  {this.getDeckCategories(key)}
                </div>
            </div>
      }
      
    })
    if (counter < 4) {
      document.getElementById('study-page-deck-list-shadow').classList.remove('study-page-deck-list-shadow')
    }
    return div
  }

  render() {
    console.log(this.props)
    return (
      <div className='study-page-total-div' >
          <div className='splash-nav'>
            <NavContainer/>
          </div>
          <div className='study-page-display-container' >
            <div className='study-page-user-info' >
              <div>Deck Name</div>
              <div>Number of Cards</div>
              <div>Categories</div>
              <div>See all deck info</div>
            </div>
            <div className='study-page-card-exp' >
              <ExperienceBarContainer/>
              <div className='study-page-container'> 
                  <StudyCardContainer/>
              </div>
            </div>
            <div className='study-other-decks-container' >
              <div><div>Choose a different deck</div></div>
                <div className='study-page-deck-list-container'>
                <div className='study-page-deck-list' >
                  {this.getEachDeck()}
                </div>
              </div>
              <div id='study-page-deck-list-shadow' className='study-page-deck-list-shadow' ></div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Study);