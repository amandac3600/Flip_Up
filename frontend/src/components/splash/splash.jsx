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
        <div className='splash-body'>
          <h1 className='splash-main-title'>Flip Up</h1>
          <p className='splash-main-description'>The one-stop source to create flashcards, quiz yourself using your own decks or others, and compete against others to test your knowledge and earn rewards</p>
          <div className='splash-block'>
            <div className='splash-cat-container'>
              <h3 className='splash-cat-title'>Find Decks By Category</h3>
              <div className='splash-cat-list'>
                <div className='splash-cat-list-item'>Deck 1</div>
                <div className='splash-cat-list-item'>Deck 2</div>
                <div className='splash-cat-list-item'>Deck 3</div>
              </div>
              <div className='splash-cat-name-list'>
                <p className='splash-cat-name-list-item'>Math</p>
                <p className='splash-cat-name-list-item'>Science</p>
                <p className='splash-cat-name-list-item'>Vocabulary</p>
              </div>
            </div>
          </div>
          <div className='splash-block-2'>
            <div className='splash-pop-container'>
              <h3 className='splash-pop-title'>Popular Decks</h3>
              <div className='splash-pop-list'>
                <div className='splash-pop-list-item'>Deck 1</div>
                <div className='splash-pop-list-item'>Deck 2</div>
                <div className='splash-pop-list-item'>Deck 3</div>
              </div>
            </div>
          </div>
        </div>
        <div className='splash-footer'>
          <Footer />
        </div>
      </div>
    )
  }
}
