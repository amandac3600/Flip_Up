import React from 'react';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
import ocean from './ocean.jpg'
import math from './math.png';
import science from './science.png';
import language from './language.png';
import { Link } from 'react-router-dom';
import "./splash.css";

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
        <div className='splash-body'>
          <img src={ocean} alt="ocean" className='splash-bg'/>
          <h1 className='splash-main-title'>Flip Up</h1>
          <p className='splash-main-description'>The one-stop source to create flashcards, quiz yourself using your own decks or others, and compete against others to test your knowledge and earn rewards</p>
          <div className='splash-make-deck-container'>
            <Link to="/decks/new" className='splash-make-deck'>Make your first deck today</Link>
          </div>
          <div className='splash-block'>
            <div className='splash-cat-container'>
              <h3 className='splash-cat-title'>Find Decks By Category</h3>
              <div className='splash-cat-list'>
                <Link to="/search/math" className='splash-cat-list-item'><img src={math} alt="Math" className='splash-cat-list-pic'/></Link>
                <Link to="/search/science" className='splash-cat-list-item'><img src={science} alt="Science" className='splash-cat-list-pic'/></Link>
                <Link to="/search/languages" className='splash-cat-list-item'><img src={language} alt="Language" className='splash-cat-list-pic'/></Link>
              </div>
              <div className='splash-cat-name-list'>
                <p className='splash-cat-name-list-item'>Math</p>
                <p className='splash-cat-name-list-item'>Science</p>
                <p className='splash-cat-name-list-item'>Languages</p>
              </div>
            </div>
          </div>
          <div className='splash-block-2'>
            <div className='splash-pop-container'>
              <h3 className='splash-pop-title'>Popular Decks</h3>
              <div className='splash-pop-list'>
                <Link to="/decks/6204a2075bb36c5ea5a68054" className='splash-pop-list-item'>Sea Animals
                  <div className='splash-pop-list-item-cat-container'>
                    <p className='splash-pop-list-item-cat'>Animals</p>
                    <p className='splash-pop-list-item-cat'>Science</p>
                  </div>
                  <div to="/" className='splash-pop-list-item-user-container'>
                    <img className='splash-pop-list-item-user-pic' src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                    <p className='splash-pop-list-item-user'>Porter</p>
                  </div>
                </Link>
                <Link to="/decks/6204a4265bb36c5ea5a68080" className='splash-pop-list-item'>Japanese Greetings
                  <div className='splash-pop-list-item-cat-container'>
                    <p className='splash-pop-list-item-cat'>Languages</p>
                    <p className='splash-pop-list-item-cat'>Japanese</p>
                  </div>
                  <div to="/" className='splash-pop-list-item-user-container'>
                    <img className='splash-pop-list-item-user-pic' src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                    <p className='splash-pop-list-item-user'>Luther</p>
                  </div>
                </Link>
                <Link to="/decks/6204a5625bb36c5ea5a680c3" className='splash-pop-list-item'>Parts of Speech
                  <div className='splash-pop-list-item-cat-container'>
                    <p className='splash-pop-list-item-cat'>Languages</p>
                    <p className='splash-pop-list-item-cat'>English</p>
                  </div>
                  <div to="/" className='splash-pop-list-item-user-container'>
                    <img className='splash-pop-list-item-user-pic' src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                    <p className='splash-pop-list-item-user'>Kali</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
