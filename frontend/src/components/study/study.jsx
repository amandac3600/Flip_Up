import React from 'react';
import { withRouter } from 'react-router-dom';

class Study extends React.Component {
  constructor(props) {
    super(props);
    this.props.getDeck(this.props.match.params.id)
  }

  

  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default withRouter(Study);