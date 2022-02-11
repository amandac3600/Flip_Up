import React from 'react';
import { withRouter } from 'react-router-dom';
import "./study.css";
import StudyCardContainer from './study_card_container';
import NavContainer from '../nav/nav_container';
import ExperienceBarContainer from './../experience_bar/experience_bar_container'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

class Study extends React.Component {
  constructor(props) {
    super(props); 
    this.props.getUserDecks(this.props.currentUser.id).then(()=>{
      this.props.getDeck(this.props.match.params.id)
    })
    
  }

  getDeckName() {
    return this.props.decks[this.props.match.params.id].name ? this.props.decks[this.props.match.params.id].name : this.props.decks[this.props.match.params.id].deck.name
  }
  
  getDeckCategories(deckId) {
    if (!this.props.decks[deckId].category) return
    return this.props.decks[deckId].category.map((category, idx)=>{
      return <div key={idx} >
                <div>{category}</div>
            </div>
    })
  }

  getCorrectCategory(deckId) {
    return this.props.decks[deckId].category ? this.getDeckCategories(deckId) : this.getDeckCategories2(deckId)
  }

  getDeckCategories2(deckId) {
    if (!this.props.decks[deckId].deck) return
    return this.props.decks[deckId].deck.category.map((category, idx)=>{
      return <div key={idx} >
                <div>{category}</div>
            </div>
    })
  }
  
  getNumberOfCards(deckId) {
  }

  goToDeckShowPage() {
    this.props.location.namespace = ''
    this.props.history.push(`/decks/${this.props.match.params.id}`)
  }

  moveToNextDeck(key) {
    this.props.location.pathname = ""
    this.props.history.push(`decks/${this.props.decks[key]._id}/study`)
  }

  getEachDeck() {
    if (!document.getElementById('study-page-deck-list-shadow')) return
    let counter = 0;
    let div = Object.keys(this.props.decks).slice(0).reverse().map((key, idx)=>{
      if (this.props.decks[key]._id !== this.props.match.params.id && this.props.decks[key].cards.length > 0 && idx > 0 && this.props.decks[key].name) {
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
    if (counter > 4) {
      document.getElementById('study-page-deck-list-shadow').classList.add('study-page-deck-list-shadow')
    } else {
      document.getElementById('study-page-deck-list-shadow').classList.remove('study-page-deck-list-shadow')
    }
    return div
  }

  render() {
    if(!this.props.decks[this.props.match.params.id]) return null
    // if (!this.props.decks[this.props.match.params.id].deck) return null
    console.log(this.props.decks[this.props.match.params.id].name)
    console.log(this.props)
    return (
      <div className='study-page-total-div' >
          <div className='splash-nav'>
            <NavContainer/>
          </div>
          <div className='study-page-display-container' >
            <div className='study-page-user-info' >
              <div>{this.getDeckName()}</div>
              <div>Cards: {this.props.decks[this.props.match.params.id].cards.length}</div>
              <div>{this.getCorrectCategory(this.props.match.params.id)}</div>
              <div onClick={()=>this.goToDeckShowPage()} ><AwesomeButton id='deck-form-submit-button' className='deck-form-submit-button' type="primary">See all info</AwesomeButton></div>
            
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
              <div id='study-page-deck-list-shadow' ></div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Study);