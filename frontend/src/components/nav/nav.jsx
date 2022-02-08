
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SearchBarContainer from '../search/search_bar_container';
import "./nav.css"

class Nav extends React.Component {

  render() {
    let nav;
    if (!this.props.currentUser) {
      nav = <nav className='nav-container'>
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
      nav = <nav className='nav-container'>
        <div className='nav-logo'>
          <Link className="nav-logo-link" to="/">LOGO</Link>
        </div>
        <div className='nav-search'>
          <SearchBarContainer className='nav-search-bar'/>
        </div>
        <div className='nav-user-logout'>
          <h4 className='nav-user-welcome'>Welcome, {this.props.currentUser.first_name}!</h4>
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
