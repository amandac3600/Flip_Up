import React from 'react';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';

export default class Splash extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div>
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
