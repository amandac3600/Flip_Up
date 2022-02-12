import React from 'react';
import { withRouter } from 'react-router-dom';

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };

    this.usernameSubmit = this.usernameSubmit.bind(this);
    // this.clearedErrors = false;
  }

  componentDidMount() {
    this.props.fetchCurrentUser()
      .then((res) => {
        this.setState({
          username: res.currentUser.username,
          email: res.currentUser.email,
          username: res.currentUser.username,
          password: '', 
          password2: '', 

        })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  usernameSubmit(e) {
    e.preventDefault();

    this.props.updateUser(this.state).then((red) => console.log('updateres', red));
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
    console.log(this.state)
    if (!this.props.user || !this.state.username) return null;
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
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="email"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="New Password"
            />
            <br />
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm New Password"
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