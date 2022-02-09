import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./deck_carousel.css"

export const DeckCarousel = (decks) => {

    if (decks.length === 0){
        return (
            <h3 className = 'profile-no-decks'>Seems there aren't any decks yet!</h3>
        )
    }
    console.log({decks})
    return (
        <div className='carousel-div'>
            <Carousel centerMode={true} centerSlidePercentage= {33} autoPlay={true} infiniteLoop={true} showThumbs={false} stopOnHover={true} showIndicators={false}>
                {decks.decks.map(deck => (
                    <Link to={`/decks/${deck._id}`}>
                    <div className="carousel-deck-item" key={deck.id}   >
                       {deck.name}
                    </div>
                    </Link>
                ))}
            </Carousel>
        </div>
    )
    
}