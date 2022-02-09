import React from 'react';
import NavContainer from '../nav/nav_container'

export default class SearchResultIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      filters: [],
    }
    console.log(props)
  }

  componentDidMount() {
    this.props.getDecks(this.props.match.params.filters).then()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.filters !== this.props.match.params.filters) {
      this.props.getDecks(this.props.match.params.filters).then()
    }
  }

  renderDecks() {
    if (!Object.keys(this.props.decks).length) return '';

    return Object.values(this.props.decks).map( deck => {
      if (!deck.cards.length) return '';
      return (
        <div key={deck._id} className='compete-main-deck-item' id={deck._id}>
          <div>
            <span>Name: </span>
            <span>{deck.name}</span>
          </div>
          <div>
            <span>Categories: </span>
            <span>{deck.category ? deck.category.join(', ') : 'None'}</span>
          </div>
          <div>
            <span>Number of Cards: </span>
            <span>{deck.cards.length}</span>
          </div>
        </div>
      )
    })
  }

  render() {
    console.log(this.props.match.params.filters)
    if (!this.props.decks) return null;
    return (
      <div>
        <NavContainer />

        <div>
          <div>
            {this.renderDecks()}
          </div>
        </div>

        <div>{this.state.errors}</div>
      </div>
    );
  }
}
