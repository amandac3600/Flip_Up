import React from 'react';
import { withRouter } from 'react-router-dom';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import "./login_form.css"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser === true) this.props.history.push('/');
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  demoLogin(e) {
    e.preventDefault();
    const user = {email: 'demo@user.com', password: 'demouser'};
    this.props.demologin(user).then(() => this.props.history.goBack());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, idx) => (
          <li key={idx} className='login-error'> {this.state.errors[error]} </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='login-page'>
        <div className='login-nav'>
            <NavContainer/>
          </div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-links'>
            <Link to="/signup" className='login-links-signup'>Sign Up</Link>
            <h2 className='login-links-login'>Log In</h2>
          </div>
          <div className='login-form-container'>
            <div className='login-form'>
              <div className='login-input-container'>
                <input type="text" className='login-input-email'
                  value={this.state.username}
                  onChange={this.update('email')}
                  placeholder="Email"
                />
                <br />
                <input type="password" className='login-input-password'
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                />
                <br />
                <input type="submit" value="Log in" className='login-button'/>
            </div>
            <div className="demo-user-login" >
              <button className='login-button-demo' onClick={this.demoLogin}>Demo User</button>
            </div>
          </div>
          </div>
          <div className='login-errors'>
            {this.renderErrors()}
          </div>
          
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);