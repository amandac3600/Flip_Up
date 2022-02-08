import React from 'react';
import { withRouter } from 'react-router-dom';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <div>{this.props.card.front}</div>
        <div>{this.props.card.back}</div>
      </div>
    );
  }
}

export default withRouter(Card);