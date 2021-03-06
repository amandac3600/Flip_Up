import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import Splash from './splash/splash'
import About from './about/about'
import Footer from './footer/footer'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import UpdateUserFormContainer from './user_profile/update_user_form_container';
import UserProfileContainer from './user_profile/user_profile_container';
import DeckFormContainer from './deck/deck_form_container'
import DeckEditFormContainer from './deck/deck_edit_form_container'
import StudyContainer from './study/study_container'
import DeckShowContainer from './deck/deck_show_container'
import CompeteModeContainer from './compete_mode/compete_mode_container';
import "./reset.css"
import SearchResultIndexContainer from './search/search_result_index_container';

const App = () => (
  <div className='app-div'>
    <Switch>
      <ProtectedRoute exact path="/profile" component={UserProfileContainer} />
      <ProtectedRoute exact path="/profile/update" component={UpdateUserFormContainer} />
      
      <Route exact path="/about" component={About} />
      <ProtectedRoute path="/search/:filters" component={SearchResultIndexContainer} />
      <ProtectedRoute path="/search/" component={SearchResultIndexContainer} />

      <ProtectedRoute exact path="/decks/new" component={DeckFormContainer} />
      <ProtectedRoute exact path="/decks/:id/edit" component={DeckEditFormContainer} />
      <ProtectedRoute path="/decks/:id/study" component={StudyContainer} />
      <ProtectedRoute path="/decks/:id" component={DeckShowContainer} />
      <ProtectedRoute path="/compete/:gameId" component={CompeteModeContainer} />

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={Splash} />
    </Switch>
    <Footer/>
  </div>
);

export default App;
