import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SearchBarContainer from '../search/search_bar_container';
import logo from './logo.png'
import "./nav.css"

class Nav extends React.Component {

  render() {
    console.log(this.props.currentUser)
    let nav;
    if (this.props.location.pathname === "/login" || this.props.location.pathname === "/signup") {
      nav = <nav className='nav-container-login'>
        <div className='nav-logo'>
          <Link className="nav-logo-link" to="/"><img src={logo} alt="Flip Up" width='45' height='45'/></Link>
        </div>
        <div className='nav-search-login'>
          <SearchBarContainer/>
        </div>
      </nav>
    } else if (!this.props.currentUser) {
      nav = <nav className='nav-container'>
        <div className='nav-logo'>
          <Link className="nav-logo-link" to="/"><img src={logo} alt="Flip Up" width='45' height='45'/></Link>
        </div>
        <div className='nav-search'>
          <SearchBarContainer/>
        </div>
        <div className="nav-login-signup">
          <Link className="nav-login" to='/login'>Log In</Link>
          <Link className="nav-signup" to='/signup'>Sign Up</Link>
        </div>
      </nav>
    } else {
      nav = <nav className='nav-container'>
        <div className='nav-logo'>
          <Link className="nav-logo-link" to="/"><img src={logo} alt="Flip Up" width='45' height='45'/></Link>
        </div>
        <div className='nav-search'>
          <SearchBarContainer className='nav-search-bar'/>
        </div>
        <div className='nav-user-logout'>
          <h4 className='nav-user-welcome'>Welcome, {this.props.currentUser.username}!</h4>
          <button className='nav-user-logout-button' onClick={() => this.props.logout()}>Log Out</button>
        </div>
      </nav>
    }

    return (
      nav
    )
  }
}

export default withRouter(Nav)