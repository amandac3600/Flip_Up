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
import CardFormContainer from './card/card_form_container'
import StudyContainer from './study/study_container'
import DeckContainer from './deck/deck_container'
import CompeteFormContainer from './compete_mode/compete_form_container';
import CompeteModeContainer from './compete_mode/compete_mode_container';
import "./reset.css"

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute exact path="/profile" component={UserProfileContainer} />
      {/* <ProtectedRoute exact path="/profile/update" component={UpdateUserFormContainer} /> */}
      <Route exact path="/" component={Splash} />
      <Route exact path="/about" component={About} />

      <ProtectedRoute exact path="/decks/new" component={DeckFormContainer} />
      <ProtectedRoute path="/decks/:id/study" component={StudyContainer} />
      <ProtectedRoute path="/decks/:id" component={DeckContainer} />

      <ProtectedRoute exact path="/compete" component={CompeteFormContainer} />
      <ProtectedRoute path="/compete/:gameId" component={CompeteModeContainer} />

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
    <div className="footer">
          <Footer/>
    </div>

  </div>
);

export default App;
