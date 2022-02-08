import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import DeckFormContainer from './deck/deck_form_container'
import CardFormContainer from './card/card_form_container'
import DeckContainer from './deck/deck_container'

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute exact path="/decks/new" component={DeckFormContainer} />
      <ProtectedRoute path="/decks/:id/study" component={DeckContainer} />
      <ProtectedRoute path="/decks/:id" component={DeckContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;