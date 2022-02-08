import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"


export const DeckCarousel = (decks) => {
    if (decks.length === 0){
            return (
                <h3 className = 'profile-no-decks'>Seems there aren't any decks yet!</h3>
            )
        }

        return (
            <div>
                <Carousel >
                    {decks.map(deck => (
                        <li className="profile-deck-li">
                            {deck.name}
                        </li>
                    ))}
                </Carousel>
            </div>
        )
    }
}