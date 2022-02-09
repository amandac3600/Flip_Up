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
        this.handleClick = this.handleClick.bind(this)

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

    handleClick(e) {
        e.preventDefault()
        this.props.history.push('/decks/new')
    }

    renderDecks() {
        const decks = this.getUserDecks()
        if (decks.length === 0){
            return (
                <div>
                    <h3 className = 'profile-no-decks'>You haven't made any decks yet!</h3>
                    <button className='profile-create-deck-button'>Create your first deck now!</button>
                </div>
            )
        }

        return (
            <div>
                <DeckCarousel decks={decks} />
                <button className='profile-create-deck-button' onClick={this.handleClick}>Create a new deck</button>
            </div>
        )
    }

    renderFriends() {
        if (!this.state.friends) {
            return (
                <div>
                    <h3 className = 'profile-no-friends'>You haven't made any friends yet!</h3>
                    <button className='profile-create-deck-button'>Find a friend now!</button>
                </div>
            )
        }
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
                            {this.renderDecks()}
                            
                        </div>
                    </div>
                    <div className="profile-right-div">
                        <div className= "profile-friends-header">
                                Friends
                        </div>
                        <div className="profile-friends-list">
                            {this.renderFriends()}
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