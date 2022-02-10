import React from 'react';
import { withRouter } from 'react-router-dom';
import "./study.css";
import StudyCardContainer from './study_card_container';
import NavContainer from '../nav/nav_container';
import ExperienceBarContainer from './../experience_bar/experience_bar_container'


class Study extends React.Component {
  constructor(props) {
    super(props); 
  }
  
  render() {
    return (
      <div>
          <div className='splash-nav'>
            <NavContainer/>
          </div>
          <div>
          <ExperienceBarContainer/>
          <div className='study-page-container'> 
              <StudyCardContainer/>
          </div>
          </div>
          <div className='study-other-decks-container' >

          </div>
      </div>
    );
  }
}

export default withRouter(Study);