import React from 'react';
import { withRouter } from 'react-router-dom';

class DeckForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.type === 'create') {
      this.state = {
        name: '',
        public: false,
        category: []
      };
    } else {
      this.state = {
        name: this.props.deck.name,
        public: this.props.deck.public,
        category: this.props.deck.category
      };
    }
    
  }


  update(field) {
    // set public state
    if (field === 'public') {
      return e => this.setState({ [field]: e.currentTarget.checked });
    
    // set category state
    } else if (field === 'history' || field === 'science' || field === 'grammar' || field === 'math') {
      return e => {
        if (e.currentTarget.checked) {
          return this.setState({ category: [...this.state.category, ...[field]] })
        } else {
          return this.setState({ category: this.state.category.filter(x => x !== field) });
        }
      }

    //set all other input states
    } else {
      return e => this.setState({ [field]: e.currentTarget.value });
    }
  }

  deckSubmit(e) {
    e.preventDefault();
    const newState = Object.assign({}, this.state, {category: Array.toString(this.state.category)})
    this.props.submit(newState)
    .then((deck)=>{
      console.log(deck)
      // route to the newly created deck
      this.props.history.push(`/decks/${deck.id}`)
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form onSubmit={this.deckSubmit.bind(this)}>
          <div>
            <br />
            <div>Deck Title</div>
            <input type="text"
              value={this.state.name}
              onChange={this.update('name')}
              placeholder="Deck Title"
            />
            <br />
            <div>
              <input id='deck-form-public' checked={this.state.public} type="checkbox" value={this.state.public} onChange={this.update('public')} />
              <label htmlFor="deck-form-public">Public</label>
            </div>
            <br />
            <br />
            <div>Categories</div>
            <div>
              <input id='deck-form-history' checked={this.state.category.includes('history')} type="checkbox" value='history' onChange={this.update('history')} />
              <label htmlFor="deck-form-history">History</label>
            </div>
            <div>
              <input id='deck-form-science' checked={this.state.category.includes('science')} type="checkbox" value='science' onChange={this.update('science')} />
              <label htmlFor="deck-form-science">Science</label>
            </div>
            <div>
              <input id='deck-form-grammar' checked={this.state.category.includes('grammar')} type="checkbox" value='grammar' onChange={this.update('grammar')} />
              <label htmlFor="deck-form-grammar">Grammar</label>
            </div>
            <div>
              <input id='deck-form-math' checked={this.state.category.includes('math')} type="checkbox" value='math' onChange={this.update('math')} />
              <label htmlFor="deck-form-math">Math</label> 
            </div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(DeckForm);