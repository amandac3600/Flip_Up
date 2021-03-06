import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div className='about-contrib'>
        <h2 className='about-contrib-title'>Meet the Team!</h2>
        <div className='about-contrib-1-div'>
          <p className='about-contrib-1-name'>Alex Ciminillo</p>
          <p>Profile pic here</p>
          <p>Description here</p>
          <a className='about-contrib-1-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='about-contrib-1-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='about-contrib-2-div'>
          <p className='about-contrib-2-name'>Amanda Chen</p>
          <p>Profile pic here</p>
          <p>Description here</p>
          <a className='about-contrib-2-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='about-contrib-2-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='about-contrib-3-div'>
          <p className='about-contrib-3-name'>Helen Edwards</p>
          <p>Profile pic here</p>
          <p>Description here</p>
          <a className='about-contrib-3-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='about-contrib-3-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='about-contrib-4-div'>
          <p className='about-contrib-4-name'>Laney Luong</p>
          <p>Profile pic here</p>
          <p>Description here</p>
          <a className='about-contrib-4-github' href="" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className='about-contrib-4-linkedin' href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    )
  }
}

export default About