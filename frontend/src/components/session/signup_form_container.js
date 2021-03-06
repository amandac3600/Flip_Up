import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    demologin: (user) => dispatch(login(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
