import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SearchBarContainer from '../search/search_bar_container';

class Nav extends React.Component {

  render() {
    console.log(this.props.currentUser)
    let nav;
    if (!this.props.currentUser) {
      nav = <nav className='nav-no-user-container'>
        <div className='nav-logo'>
          <Link className="nav-logo-link" to="/">Flip Up</Link>
        </div>
        <div className='nav-search'>
          <SearchBarContainer/>
        </div>
        <div className="nav-login-signup">
          <Link className="nav-login" to='/login'>Log In</Link>
          <Link className="nav-signup" to='/signup'>Sign Up</Link>
        </div>
      </nav>
    } else if (this.props.currentUser) {
      nav = <nav className='nav-user-container'>
        <div className='nav-logo'>
          <Link className="nav-logo-link" to="/">Flip Up</Link>
        </div>
        <div className='nav-search'>
          <SearchBarContainer/>
        </div>
        <div className='nav-user-logout'>
          <h1 className='nav-user-welcome'>Welcome, {this.props.currentUser.first_name}!</h1>
          <button className='nav-user-logout-button' onClick={() => this.props.logout()}>Log Out</button>
        </div>
      </nav>
    }

    return (
      nav
    )
  }
}

export default Nav
