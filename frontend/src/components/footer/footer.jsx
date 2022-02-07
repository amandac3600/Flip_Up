import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-contrib'>
        <h6 className='footer-contrib-title'>Contributors</h6>
        <div className='footer-contrib-1-div'>
          <p className='footer-contrib-1-name'>Alex Ciminillo</p>
          <a className='footer-contrib-1-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='footer-contrib-1-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='footer-contrib-2-div'>
          <p className='footer-contrib-2-name'>Amanda Chen</p>
          <a className='footer-contrib-2-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='footer-contrib-2-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='footer-contrib-3-div'>
          <p className='footer-contrib-3-name'>Helen Edwards</p>
          <a className='footer-contrib-3-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='footer-contrib-3-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='footer-contrib-4-div'>
          <p className='footer-contrib-4-name'>Laney Luong</p>
          <a className='footer-contrib-4-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='footer-contrib-4-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    )
  }
}

export default Footer
