import React from 'react';
import { withRouter } from 'react-router-dom';
import { getCard } from '../../util/card_api_util';
import "./study.css";
import StudyCardContainer from './study_card_container';

class Study extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div>
          <StudyCardContainer/>
      </div>
    );
  }
}

export default withRouter(Study);