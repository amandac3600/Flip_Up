import React from 'react';
import { withRouter } from 'react-router-dom';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import "./signup_form.css"

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      firstName: '',
      lastName: '',
      errors: {}
    };

    this.usernameSubmit = this.usernameSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.clearedErrors = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.signedIn === true) this.props.history.push('/login');
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }

  demoLogin(e) {
    e.preventDefault();
    const user = {email: 'demo@user.com', password: 'demouser'};
    this.props.demologin(user).then(() => this.props.history.goBack());
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  usernameSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.signup(this.state, this.props.history).then(() => this.props.login(user));
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, idx) => (
          <li key={idx} className='signup-error'> {this.state.errors[error]} </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='signup-page'>
        <div className='signup-nav'>
            <NavContainer/>
        </div>
        <form onSubmit={this.usernameSubmit}>
          <div className='signup-links'>
              <h2 className='signup-links-signup'>Sign Up</h2>
              <Link to="/login" className='signup-links-login'>Log In</Link>
          </div>
          <div className='signup-form-container'>
            <div className='signup-form'>
              <input type="text" className='signup-input'
                value={this.state.firstName}
                onChange={this.update('firstName')}
                placeholder="First Name"
              />
              <br />
              <input type="text" className='signup-input'
                value={this.state.lastName}
                onChange={this.update('lastName')}
                placeholder="Last Name"
              />
              <br />
              <input type="text" className='signup-input'
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              <br />
              <input type="text" className='signup-input'
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />
              <br />
              <input type="password" className='signup-input'
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              <br />
              <input type="password" className='signup-input-password'
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
              <br />
              <input type="submit" value="Submit" className='signup-button'/>`
              <div className="demo-user" >
                <button className='signup-button-demo' onClick={this.demoLogin}>Demo User</button>
            </div>
            </div>
            
          </div>
          <div className='signup-errors'>
            {this.renderErrors()}
          </div>
            
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);