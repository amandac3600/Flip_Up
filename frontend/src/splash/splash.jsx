import React from 'react';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
import "./splash.css"

export default class Splash extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div className='splash-page'>
        <div className='splash-nav'>
          <NavContainer/>
        </div>
        <div className='splash-footer'>
          <Footer />
        </div>
      </div>
    )
  }
}
