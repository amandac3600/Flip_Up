import React from 'react';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
import './user_profile.css';
import { DeckCarousel } from '../deck-carousel/deck_carousel';

class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.currentUser.id

        }
        this.getUserDecks = this.getUserDecks.bind(this)

    }

    componentDidMount() {
        this.props.fetchUser(this.state.id)
            .then(action => {
                this.setState({
                    user: {
                        username: action.currentUser.username, 
                        deck_ids: action.currentUser.decks
                    }
            })})        
        this.props.getDecks()
            .then(action =>{
                this.setState({
                        decks: action.decks, 
                })
            })
            
    }

    getUserDecks() {
        // console.log('inside get user decks', this.state.decks)
        return this.state.decks.filter(user_deck => {
            return (
                this.state.user.deck_ids.includes(user_deck._id) 
            )
        })

    }


    render_decks() {
        const decks = this.getUserDecks()
        if (decks.length === 0){
            return (
                <h3 className = 'profile-no-decks'>You haven't made any decks yet!</h3>
            )
        }

        return (
            <div>
                <DeckCarousel decks={decks} />
  
            </div>
        )
    }

    render() {
 
        if(!this.state.user) return (
            <p> loading</p>
        )
        const decks = this.state.user.deck_ids
        const user = this.state.user.username

        return (
            <div>
                 <div className='about-nav'>
                    <NavContainer/>
                </div>

                <div className='profile-content'>
                    {/* are we adding nav bar here or on app?? */}
                    <div className="profile-left-div">
                        <div className="profile-info-div">
                            <div className="profile-user-info">
                                <img src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                                <p>{this.state.user.username}</p>
                                <button>Edit profile</button>
                            </div>
                            <div className='profile-user-stats'>
                                <p>Wins</p>
                                <p>Loses</p>
                                <p>Points</p>
                            </div>
                        </div>
                        <div className="profile-deck-scroller">
                            {this.render_decks()}
                        </div>
                    </div>
                    <div className="profile-right-div">
                        <div className="profile-friends-list">
                            <div className= "profile-friends-header"><h3>Friends</h3>
                            <button>Pending</button>
                            </div>
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
export default UserProfile 