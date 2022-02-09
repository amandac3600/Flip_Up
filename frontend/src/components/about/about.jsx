import React from 'react';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
import {FaGithubSquare} from 'react-icons/fa';
import {AiFillLinkedin} from 'react-icons/ai'
import alex from './alexpp.jpg';
import amanda from './amandapp.jpeg'
import "./about.css";

export default class About extends React.Component {
  render() {
    return (
      <div className='about-contrib-container'>
        <div className='about-nav'>
          <NavContainer/>
        </div>
        <h6 className='about-contrib-title'>Meet the Team</h6>
        <div className='about-contrib'>
          <div className='about-contrib-div'>
            <img src={alex} alt="Alex Ciminillo" className='about-profile-pic'/>
            <p className='about-contrib-name'>Alex Ciminillo</p>
            <p className='about-contrib-descrip'>Hi, I'm Alex! I'm a Software Engineer with a Bachelors in Mechanical Engineering, and another Bachelors in Japanese Language and Cultural. I have extensive experience working on full stack web applications utilizing modern technologies such as React, Redux, Node, Postgres, MongoDB, and Ruby on Rails. My professional experience includes working as a software engineer developing android and ios apps, and websites.</p>
            <div className='about-contrib-links'>
              <a className='about-contrib-github' href="https://github.com/alex-ciminillo" target="_blank" rel="noopener noreferrer"><FaGithubSquare/></a>
              <a className='about-contrib-linkedin' href="https://www.linkedin.com/in/alexzander-ciminillo" target="_blank" rel="noopener noreferrer"><AiFillLinkedin/></a>
            </div>
          </div>
          <div className='about-contrib-div'>
            <img src={amanda} alt="Amanda Chen" className='about-profile-pic'/>
            <p className='about-contrib-name'>Amanda Chen</p>
            <p className='about-contrib-descrip'>Hello, I'm Amanda! I am a fullstack software engineer based in Los Angeles, CA. I have experience with many technologies including Ruby on Rails, Node JS, PostgreSQL, MongoDB, React, and Redux, but for Flip Up, I had a great time working on the CSS and HTML for the pages.</p>
            <p className='about-contrib-descrip'>My favorite sea animals are octopi...or octopuses?</p>
            <div className='about-contrib-links'>
              <a className='about-contrib-github' href="https://github.com/amandac3600" target="_blank" rel="noopener noreferrer"><FaGithubSquare/></a>
              <a className='about-contrib-linkedin' href="https://www.linkedin.com/in/amanda-chen-4b175a146/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin/></a>
            </div>
          </div>
          <div className='about-contrib-div'>
            <p>Profile Pic Here</p>
            <p className='about-contrib-name'>Helen Edwards</p>
            <p className='about-contrib-descrip'>Description Here</p>
            <div className='about-contrib-links'>
              <a className='about-contrib-github' href="https://github.com/HelenEdwards" target="_blank" rel="noopener noreferrer"><FaGithubSquare/></a>
              <a className='about-contrib-linkedin' href="https://www.linkedin.com/in/helen-grace-edwards-96981532/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin/></a>
            </div>
          </div>
          <div className='about-contrib-div'>
            <p>Profile Pic Here</p>
            <p className='about-contrib-name'>Laney Luong</p>
            <p className='about-contrib-descrip'>Description Here</p>
            <div className='about-contrib-links'>
              <a className='about-contrib-github' href="https://github.com/laneyNL" target="_blank" rel="noopener noreferrer"><FaGithubSquare/></a>
              <a className='about-contrib-linkedin' href="https://www.linkedin.com/in/laneyluong/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin/></a>
            </div>
          </div>
        </div>
        <div className='about-footer'>
          <Footer/>
        </div>
      </div>
    )
  }
}
