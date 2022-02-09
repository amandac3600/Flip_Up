import React from 'react';
import { withRouter } from 'react-router-dom';
import "./study.css";

class StudyCard extends React.Component {
  constructor(props) {
    super(props);
    this.freeMode = false;
    this.counter = 0;
    this.reviewCounter = 0;
    this.update = true;
    this.props.getDeck(this.props.match.params.id).then(()=>{
        this.currentCard = 1;
        this.cardId = this.props.decks[this.props.match.params.id].cards[this.counter]
        this.cardId2 = this.props.decks[this.props.match.params.id].cards[this.counter + 1]
        this.props.getCard(this.cardId)
        this.props.getCard(this.cardId2)
        this.getTheRestOfTheCards();
    })
  }

  getTheRestOfTheCards() {
    this.props.decks[this.props.match.params.id].cards.map((key, idx)=>{
        if (idx > 1 && idx < 10) {
            this.props.getCard(key)
            this.loaded = idx
        }
    })
  }

  nextCard(answer, cardNum){
    this.counter += 1;
    if (this.freeMode === true) {
        if (this.checkEndOfFreeMode()) {
            this.update = false;
        } else {
            this.update = true;
        }
    }
    if (answer === 'correct') {
        let card
        if (cardNum === 1) { 
            this.currentCard = 2;
            card = Object.assign({}, this.props.cards[this.cardId]);
            if (this.update || this.reviewUpdate) {
                document.getElementById('study-card-back').style.display = 'none'
                document.getElementById('study-card-front').style.display = 'none'
                document.getElementById('study-card-back2').style.display = 'none'
                document.getElementById('study-card-front2').style.display = 'flex'
            }
            
        } else {
            this.currentCard = 1;
            card = Object.assign({}, this.props.cards[this.cardId2]);
            if (this.update || this.reviewUpdate) {
                document.getElementById('study-card-back').style.display = 'none'
                document.getElementById('study-card-front').style.display = 'flex'
                document.getElementById('study-card-back2').style.display = 'none'
                document.getElementById('study-card-front2').style.display = 'none'
            }
            
        }
        this.freeMode ? card.count = card.count : card.count += 1;
        this.props.updateCard(card);
    } else if (answer === 'incorrect') {
        let card
        if (cardNum === 1) { 
            this.currentCard = 2;
            card = Object.assign({}, this.props.cards[this.cardId]);
            if (this.update || this.reviewUpdate) {
                document.getElementById('study-card-back').style.display = 'none'
                document.getElementById('study-card-front').style.display = 'none'
                document.getElementById('study-card-back2').style.display = 'none'
                document.getElementById('study-card-front2').style.display = 'flex'
            }
            
        } else {
            this.currentCard = 1;
            card = Object.assign({}, this.props.cards[this.cardId2]);
            if (this.update || this.reviewUpdate) {
                document.getElementById('study-card-back').style.display = 'none'
                document.getElementById('study-card-front').style.display = 'flex'
                document.getElementById('study-card-back2').style.display = 'none'
                document.getElementById('study-card-front2').style.display = 'none'
            }
            
        }
        card.count = 0;
        this.props.updateCard(card);
    } 
    
    if (this.counter === this.props.decks[this.props.match.params.id].cards.length - 1) { this.counter = -1 }
    
    if (cardNum === 1) { 
        this.cardId = this.props.decks[this.props.match.params.id].cards[this.counter + 1]
        this.props.getCard(this.cardId)
        if (this.loaded + 1 !== this.props.decks[this.props.match.params.id].cards.length) {
            this.loaded += 1
            this.props.getCard(this.props.decks[this.props.match.params.id].cards[this.loaded])
        }
    } else {
        this.cardId2 = this.props.decks[this.props.match.params.id].cards[this.counter + 1]
        this.props.getCard(this.cardId2)
        if (this.loaded + 1 !== this.props.decks[this.props.match.params.id].cards.length) {
            this.loaded += 1
            this.props.getCard(this.props.decks[this.props.match.params.id].cards[this.loaded])
        }
    }

    if (!this.update) {
        this.update = true;
        this.currentCard = 1;
        this.counter = 0;
        this.reviewCounter = 0;
        this.cardId = this.props.decks[this.props.match.params.id].cards[this.counter]
        this.cardId2 = this.props.decks[this.props.match.params.id].cards[this.counter + 1]
        this.props.getCard(this.cardId)
        this.props.getCard(this.cardId2)
    }

  }

  showBack(cardNum) {
    if (cardNum === 1) {
        document.getElementById('study-card-back').style.display = 'flex'
        document.getElementById('study-card-front').style.display = 'none'
    } else {
        document.getElementById('study-card-back2').style.display = 'flex'
        document.getElementById('study-card-front2').style.display = 'none'
    }
    
  }

  getTimeDifference(date) {
    let now = new Date();
    let lastReviewed = new Date(date);
    return (Math.abs(now - lastReviewed)/1000)/60
  }

  allCardsReviewed() {
    return Object.keys(this.props.cards).every((key)=>{
        let count = this.props.cards[key].count
        let date = this.props.cards[key].reviewed
        if (count == 1 && this.getTimeDifference(date) > 10 || count == 0 && this.getTimeDifference(date) > 1) {
            return false
        }
        return true
    })
  }

  checkReviewTime(cardId) {
    let date = this.props.cards[cardId].reviewed
    switch (this.props.cards[cardId].count) {
        case 0:
            return true
        case 1:
            return this.getTimeDifference(date) > .5 ? true : false
        case 2:
            return this.getTimeDifference(date) > 1 ? true : false
        case 3:
            return this.getTimeDifference(date) > 10 ? true : false
        case 4:
            return this.getTimeDifference(date) > 60 ? true : false
        case 5:
            return this.getTimeDifference(date) > 1440 ? true : false
        case 6:
            return this.getTimeDifference(date) > 2880 ? true : false
        case 7:
            return this.getTimeDifference(date) > 4320 ? true : false
        case 8:
            return this.getTimeDifference(date) > 7200 ? true : false
        case 9:
            return this.getTimeDifference(date) > 12960 ? true : false
        default:
            break;
    } 
  }

  checkAllReviewTime() {
    Object.keys(this.props.cards).every((key)=>{
        if (this.checkReviewTime(key)) {
            this.cardId = key
            this.counter = this.props.decks[this.props.match.params.id].cards.indexOf(key);
            return false
        }
        return true
    })
  }

  checkIfAllCardsDone() {
      let deckLength = this.props.decks[this.props.match.params.id].cards.length;
      let studiedLength = Object.keys(this.props.cards).length
      if (this.allCardsReviewed() && deckLength === studiedLength) {
        return true;
      }
      return false;
  }

  resetInFreeMode() {
    this.lastCard = false;
    this.timeToReview = true;
    this.allCardsDoneForNow = false;
    this.freeMode = true;
    this.counter = 0;
    this.currentCard = 1;
    this.cardId = this.props.decks[this.props.match.params.id].cards[this.counter]
    this.cardId2 = this.props.decks[this.props.match.params.id].cards[this.counter + 1]
    let card = Object.assign({}, this.props.cards[this.cardId]);
    this.props.updateCard(card);
    card = Object.assign({}, this.props.cards[this.cardId2]);
    this.props.updateCard(card);
  }

    checkEndOfFreeMode() {
        if (this.counter >= this.props.decks[this.props.match.params.id].cards.length - 1 && this.freeMode === true) {
            this.lastCard = true;
            return false;
        }
        if (this.lastCard === true) {
            this.freeMode = false;
            this.lastCard = false;
            return true;
        }
        return false;
    }

  getCard() {
    
    if (!this.props.cards[this.cardId]) return
    if (this.freeMode === false) {
        if (this.currentCard === 1) {
            this.timeToReview = this.checkReviewTime(this.cardId);
        } else {
            this.timeToReview = this.checkReviewTime(this.cardId2);
        }
        this.timeToReview ? this.reviewCounter = 0 : this.reviewCounter += 1;
        if (this.reviewCounter >= this.props.decks[this.props.match.params.id].cards.length) { 
            this.allCardsDoneForNow = true 
        }
        if (!this.timeToReview) { this.reviewUpdate = false }
        else { this.reviewUpdate = true }
    }
    return this.allCardsDoneForNow ? 
        <div>
            <div id='study-card-front-no' >
                <div>No more cards to study</div>
                <div>
                    <div onClick={()=>this.resetInFreeMode()} >Review Anyway</div>
                </div>
            </div>
            <div id='study-card-back'></div>
        </div>
    
    : this.timeToReview ? <div>
                <div id='study-card-front' onClick={()=>this.showBack(1)} >
                    <div>{this.props.cards[this.cardId].front}</div>
                </div>
                <div id='study-card-back'>
                    <div>{this.props.cards[this.cardId].back}</div>
                    <div></div>
                    <div>{this.props.cards[this.cardId].front}</div>
                    <div className='study-card-back-buttons' >
                        <div onClick={()=>this.nextCard('incorrect', 1)} >
                            <div>Incorrect1</div>
                        </div>
                        <div onClick={()=>this.nextCard('correct', 1)} >
                            <div>Correct1</div>
                        </div>
                    </div>
                </div>
                <div id='study-card-front2' onClick={()=>this.showBack(2)} >
                    <div>{this.props.cards[this.cardId2].front}</div>
                </div>
                <div id='study-card-back2'>
                    <div>{this.props.cards[this.cardId2].back}</div>
                    <div></div>
                    <div>{this.props.cards[this.cardId2].front}</div>
                    <div className='study-card-back-buttons2' >
                        <div onClick={()=>this.nextCard('incorrect', 2)} >
                            <div>Incorrect2</div>
                        </div>
                        <div onClick={()=>this.nextCard('correct', 2)} >
                            <div>Correct2</div>
                        </div>
                    </div>
                </div>
            </div>
            :
            this.nextCard()
  }

  render() {
    if (!this.props.decks[this.props.match.params.id]) return null
    return (
      <div>
          {this.getCard()}
      </div>
    );
  }
}

export default withRouter(StudyCard);