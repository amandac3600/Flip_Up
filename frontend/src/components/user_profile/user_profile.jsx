import React from 'react';
import NavContainer from '../nav/nav_container';
import { Link } from "react-router-dom";
import Footer from '../footer/footer';
import './user_profile.css';
import './friends_search.css';
import { DeckCarousel } from '../deck-carousel/deck_carousel';
import  FriendsSearch  from './friends_search';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.currentUser.id,
            decks: props.decks,
            showFriendModal: false
        }   
        
        // this.getUserDecks = this.getUserDecks.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }


    componentDidMount() {
        this.props.fetchUser(this.state.id)
            .then(action => {
                console.log('in component did mount', action.currentUser.decks)
                this.setState({
                    user: {
                        username: action.currentUser.username, 
                        wins: action.currentUser.wins, 
                        loses: action.currentUser.loses,
                        points: action.currentUser.point, 
                        decks: action.currentUser.decks,
                       
                    }

                    
            })}) 
        
        this.props.getDecks() 
            .then(action => {
                this.setState({
                    decks: Object.values(action.decks)
                })
            })
        
    
        this.props.getFriends(this.state.id)
            .then(action => {
                // console.log({action})
                // console.log('action.friends:', action.friends)
                this.setState({
                    user: {
                        friends: action.friends, 
                        ...this.state.user
                    }
                })
            })
         
    }

    getUserDecks() {
        return this.state.decks.filter(deck => {

            return (
                this.state.user.decks.includes(deck._id) 
            )
        })

    }

    // getFriendsList(){
    //     const friend_ids = this.state.user.friends_ids


    // }

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
                    <button className='profile-create-deck-button' onClick={() => this.setState({showFriendModal: true}) }>Find a friend now!</button>
                    <div className={ this.state.showFriendModal ? 'modal' : 'none'}><FriendsSearch off={()=> this.setState({showFriendModal: false})} /></div>
                </div>
            )
        }

        <div className="profile-friends-list">
            <ul>
                {/* {this.state.user.friends.map(friend_id => (

                ))} */}
            </ul>
        </div>

    }

    renderStats() {
        let wins 
        let losses
        let points

        // if (this.state.user.wins.length === 0){
        //     wins = 
        // }
        <div className='profile-user-stats'>
            <p>Wins: {this.state.user.wins.length}</p>
            <p>Loses: {this.state.user.wins.length}</p>
            <p>Points: {this.state.user.points}</p>
        </div>
    }

    render() {
        console.log('in render', this.state)
        if(!this.state.user || !this.state.decks) return (
            <p> loading</p>
        )
        const user = this.state.user.username
        
        return (
            <div>
                 <div className='about-nav'>
                    <NavContainer/>
                </div>
                <div className= "search-friends-modal">

                </div>
                <div className='profile-content'>
                    {/* are we adding nav bar here or on app?? */}
                    <div className="profile-left-div">
                        <div className="profile-info-div">
                            <div className="profile-user-info">
                                <img src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                                <p>{this.state.user.username}</p>
                                <Link to="/profile/update">Edit profile</Link>
                            </div>
                            <div className='profile-user-stats'>
                                {/* <p>Wins: {this.state.user.wins.length}</p>
                                <p>Loses: {this.state.user.loses.length}</p>
                                <p>Points: {this.state.user.points}</p> */}
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
                        <div>
                            {this.renderFriends()}
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserProfile 