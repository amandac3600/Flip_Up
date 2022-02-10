import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css"

class Footer extends React.Component {
  
  render() {
    return (
      <div id='footer-total-container' className='footer-links'>
        <h4 className='footer-github'>
          <a className='footer-github-link' href="https://github.com/amandac3600/Flip_Up" target="_blank" rel="noopener noreferrer">Project Repo</a>
        </h4>
        <h4 className='footer-about'>
          <Link to='/about' className='footer-about-link'>About Us</Link>
        </h4>
      </div>
    )
  }
}

export default Footer
