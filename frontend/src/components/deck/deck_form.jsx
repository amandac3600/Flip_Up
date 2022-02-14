import React from 'react';
import { withRouter } from 'react-router-dom';

import "./deck_form.css"
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import NavBarContainer from './../nav/nav_container'


class DeckForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.props.getUserDecks(this.props.currentUser.id)
    if (this.props.type === 'create') {
      this.state = {
        name: '',
        public: false,
        category: [],
        errors: [],
      };
     } else if (this.props.deck) {
      this.state = {
        name: this.props.deck.name,
        public: this.props.deck.public,
        category: this.props.deck.category,
        errors: [],

      };
    } else {
      this.state = {
        name: '',
        public: false,
        category: [],
        errors: [],
      };
    }
    
  }

  componentDidMount() {
    
    if (this.props.type !== 'create') {
      let that = this
      setTimeout(function stateSetter(){
      if (that.props.deck) {
        that.setCategoryLabelState(that.props.deck.category)
        that.setState({
          name: that.props.deck.name,
          public: that.props.deck.public,
          category: that.props.deck.category
        })
      } else {
        setTimeout(stateSetter, 100)
      }
    },100)  
    }
    
  }

  componentDidUpdate() {
    
  }

  update(field) {
    // set public state
    if (field === 'public') {
      return e => this.setState({ [field]: e.currentTarget.checked });
    
    // set category state
    } else if (field === 'history' || field === 'science' || field === 'grammar' || field === 'math' || field === 'animals' || field === 'languages' || field === 'japanese' || field === 'english') {
      return e => {
        if (e.currentTarget.checked) {
          document.getElementById(`deck-form-${field}-label`).classList.add("checked");
          return this.setState({ category: [...this.state.category, ...[field]] })
        } else {
          document.getElementById(`deck-form-${field}-label`).classList.remove("checked");
          return this.setState({ category: this.state.category.filter(x => x !== field) });
        }
      }
 
    //set all other input states
    } else {
      return e => this.setState({ [field]: e.currentTarget.value });
    }
  }


  setCategoryLabelState(categories) {
    categories.map((field)=>{
      document.getElementById(`deck-form-${field}-label`).classList.add("checked");
    })
  }

  deckSubmit(e) {
    e.preventDefault();
    const newState = Object.assign({}, this.state, {category: this.state.category.join(',')}, {_id: this.props.match.params.id})
    this.props.submit(newState)
    .then((res)=>{
      this.props.history.push(`/decks/${res.deck._id}`)
    }, (err) => this.setState({errors: Object.values(err.response.data)}))
  }

  buttonFunction() {
    return false
  }

  getDeckCategories(deckId) {
    return this.props.decks[deckId].category.map((category, idx)=>{
      return <div key={idx} >
                <div>{category}</div>
            </div>
    })
  }
  
  getNumberOfCards(deckId) {
  }

  editDeck(key) {
    this.props.location.pathname = ''
    this.props.history.push(`decks/${this.props.decks[key]._id}/edit`)
  }

  getEachDeck() {
    if (!document.getElementById('study-page-deck-list-shadow')) return 
    let counter = 0;
    let div = Object.keys(this.props.decks).slice(0).reverse().map((key, idx)=>{
      if (idx > 0 && this.props.decks[key]._id !== this.props.match.params.id) {
        counter += 1
        return <div key={key} className='deck-form-page-deck-list-item grow3' onClick={()=>this.editDeck(key)} >
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
      document.getElementById('study-page-deck-list-shadow').classList.add('deck-form-page-deck-list-shadow')
    }
    return div
  }

  renderErrors() {
    return (
    <div className='deck-form-errors'>
      {this.state.errors.map((error, idx) => {
        return ( <div key={idx}> {error} </div> )
      }) }
    </div> )
  }

  render() {
    
    return (
      <div className='deck-form-container' >
        <NavBarContainer/>
        <div className='deck-form-and-decks' >
        <form onSubmit={this.deckSubmit.bind(this)}>
          <div>
            <br />
            <input id='deck-form-name' type="text"
              value={this.state.name}
              onChange={this.update('name')}
              placeholder="Deck Name"
            />
            <br />
            <div>
              <label id='deck-form-public-label' htmlFor="deck-form-public">Make this deck public?</label>
              <input id='deck-form-public' checked={this.state.public} type="checkbox" value={this.state.public} onChange={this.update('public')} />
              
            </div>
            <br />
            <br />
            <div className='deck-form-categories' >Categories</div>
            <div className='deck-form-categories-container' >
            <div>
              <input id='deck-form-history' checked={this.state.category.includes('history')} type="checkbox" value='history' onChange={this.update('history')} />
              <label id='deck-form-history-label' htmlFor="deck-form-history">History</label>
            </div>
            <div>
              <input id='deck-form-science' checked={this.state.category.includes('science')} type="checkbox" value='science' onChange={this.update('science')} />
              <label id='deck-form-science-label' htmlFor="deck-form-science">Science</label>
            </div>
            <div>
              <input id='deck-form-grammar' checked={this.state.category.includes('grammar')} type="checkbox" value='grammar' onChange={this.update('grammar')} />
              <label id='deck-form-grammar-label' htmlFor="deck-form-grammar">Grammar</label>
            </div>
            <div>
              <input id='deck-form-math' checked={this.state.category.includes('math')} type="checkbox" value='math' onChange={this.update('math')} />
              <label id='deck-form-math-label' htmlFor="deck-form-math">Math</label> 
            </div>
            <div>
              <input id='deck-form-animals' checked={this.state.category.includes('animals')} type="checkbox" value='animals' onChange={this.update('animals')} />
              <label id='deck-form-animals-label' htmlFor="deck-form-animals">Animals</label> 
            </div>
            <div>
              <input id='deck-form-languages' checked={this.state.category.includes('languages')} type="checkbox" value='languages' onChange={this.update('languages')} />
              <label id='deck-form-languages-label' htmlFor="deck-form-languages">Languages</label> 
            </div>
            <div>
              <input id='deck-form-japanese' checked={this.state.category.includes('japanese')} type="checkbox" value='japanese' onChange={this.update('japanese')} />
              <label id='deck-form-japanese-label' htmlFor="deck-form-japanese">Japanese</label> 
            </div>
            <div>
              <input id='deck-form-english' checked={this.state.category.includes('english')} type="checkbox" value='english' onChange={this.update('english')} />
              <label id='deck-form-english-label' htmlFor="deck-form-english">English</label>
              
            </div>
            </div>
            <div className='deck-form-submit-button-div' ><AwesomeButton id='deck-form-submit-button' className='deck-form-submit-button' type="primary">Save Deck</AwesomeButton></div>
            {this.renderErrors()}
          </div>
        </form>
        
        <div className='deck-form-other-decks-container' >
              <div><div>Edit Decks</div></div>
                <div className='deck-form-page-deck-list-container'>
                <div className='deck-form-page-deck-list' >
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

export default withRouter(DeckForm);