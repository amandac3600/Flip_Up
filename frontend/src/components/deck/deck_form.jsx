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
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  deckSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state).then((deck)=>{
      this.props.history.push(`/decks/${deck.id}`)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.deckSubmit}>
          <div>
            <br />
            <input type="text"
              value={this.state.name}
              onChange={this.update('name')}
              placeholder="Deck Title"
            />
            <br />
            <div>
              <input id='deck-form-public' checked={this.state.public} type="checkbox" value={this.state.public} onChange={this.update('public')} />
              <label for="deck-form-public">Public</label>
            </div>
            <br />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(DeckForm);