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
    return this.props.decks[deckId].category.map((category)=>{
      return <div>
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
    return Object.keys(this.props.decks).slice(0).reverse().map((key, idx)=>{
      if (idx > 0) {
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
  }

  render() {
    console.log(this.props)
    return (
      <div className='study-page-total-div' >
          <div className='splash-nav'>
            <NavContainer/>
          </div>
          <div className='study-page-display-container' >
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
              <div className='study-page-deck-list-shadow' ></div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Study);