import React from 'react';
import { withRouter } from 'react-router-dom';
import NavContainer from '../nav/nav_container';
import './update_user_form.css';

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

    if (!this.props.user || !this.state.username) return null;
    return (
      <div className="update-user-form-container">
        <NavContainer />
        <form onSubmit={this.usernameSubmit} className='update-user-form'>
          <div className="update-user-form-items">
            <div className='update-user-form-title'>Update your profile:</div>
            <br />
            <label >Username:
              <br /><input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="username"
              /></label>
            <br />
            <label >Email: <br/>
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="email"
            /></label>
            <br />
            <label >New Password:<br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="New Password"
            /></label>
            <br />
            <label >Confirm New Password:<br />
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
                placeholder="Confirm New Password"
            /></label>
            <br />
            <input type="submit" value="Update User" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(UpdateUserForm);