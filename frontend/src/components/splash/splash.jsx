import React from 'react';
import { Link } from 'react-router-dom'
import NavContainer from '../nav/nav_container'
import Footer from '../footer/footer'

export default class Splash extends React.Component {
  constructor(props) {
    super(props)

    this.clearErrors = this.clearErrors.bind(this)
  }

  clearErrors(e) {
    // this.props.clearErrors()
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.searchBusinesses
  }

  render () {
    return (
      <div>
        <div className='splash-nav'>
          <NavContainer/>
        </div>      
        <div className='splash-footer'>
          <Footer/>  
        </div>  
      </div>
    )
  }
}
