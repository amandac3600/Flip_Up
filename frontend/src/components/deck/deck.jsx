import React from 'react';
import { withRouter } from 'react-router-dom';

class Deck extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <div>{this.props.deck.name}</div>
        
      </div>
    );
  }
}

export default withRouter(Deck);