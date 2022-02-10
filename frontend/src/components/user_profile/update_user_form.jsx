import React from 'react';
import { withRouter } from 'react-router-dom';

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;

    this.usernameSubmit = this.usernameSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.signedIn === true) this.props.history.push('/login');
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  usernameSubmit(e) {
    e.preventDefault();

    this.props.signup(this.state, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, idx) => (
          <li key={idx}> {this.state.errors[error]} </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.usernameSubmit}>
          <div className="signup-form">

            <br />
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="username"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(UpdateUserForm);