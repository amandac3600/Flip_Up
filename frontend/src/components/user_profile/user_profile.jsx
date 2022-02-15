import React from 'react';
import NavContainer from '../nav/nav_container';
import { Link } from "react-router-dom";
import ExperienceBarContainer from './../experience_bar/experience_bar_container';
import Footer from '../footer/footer';
import { DeckCarousel } from '../deck-carousel/deck_carousel';
import  FriendsSearchContainer  from './friends_search_container';
import ProfileIcon from './profile_icon';
import ChallengesContainer from '../compete_mode/challenges_container';
import FriendsRequestContainer from './friend_requests_container';
import new_friend_icon from './new_friend_icon.png';
import { AwesomeButton } from "react-awesome-button";
import { BsTrash } from 'react-icons/bs';
import "react-awesome-button/dist/styles.css";
import './user_profile.css';
import './friends_search.css';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // user: props.currentUser,
            decks: this.props.decks,
            showFriendModal: false, 
            showFriendRequestModal: false
        }   
        
        // this.getUserDecks = this.getUserDecks.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleDeleteFriend = this.handleDeleteFriend.bind(this)
    }


    componentDidMount() {
        this.props.fetchCurrentUser();
        this.props.getFriends();
        this.props.getDecks() 
            .then(action => {
                this.setState({
                    decks: Object.values(action.decks)
                })
            })
        
    
        this.props.getFriends(this.state.id)
            .then(action => {

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
                this.props.users.current.decks.includes(deck._id) 
            )
        })

    }

    handleClick(e) {
        e.preventDefault()
        this.props.history.push('/decks/new')
    }

    handleDeleteFriend(friendId) {
        return(e) => {
        this.props.removeFriend({friendId: friendId, requestType: 'remove'})
            .then(() => {
            this.props.getFriends();
            });
        }
    }

    renderDecks() {
        const decks = this.getUserDecks()

        if (decks.length === 0){
            return (
                <div>
                    <h3 className = 'profile-no-decks'>You haven't made any decks yet!</h3>
                    <div className= 'make-deck-button' onClick={this.handleClick}><AwesomeButton type="primary" >Create your first deck now!</AwesomeButton></div> 
                </div>
            )
        }

        return (
            <div>
             
                <div className='profile-all-decks'>
                    {decks.map(deck => (
                        <Link to={`/decks/${deck._id}`} key={deck._id}>
                        <div className="carousel-deck-item"    >
                            {deck.name}
                        </div>
                        </Link>
                ))}
    
            </div>
                <div className= 'make-deck-button' onClick={this.handleClick}>
                    <AwesomeButton type="primary" >
                        Create a deck now!
                    </AwesomeButton>
                </div> 
            
            </div>
        )
    }

    

    renderFriends() {

        if (!this.props.users.friends || this.props.current.friendIds.length === 0 ) {
            return (
                <div>
                    <h3 className = 'profile-no-friends'>You haven't made any friends yet!</h3>
                    <div className= 'find-frineds-button' onClick={() => this.setState({showFriendModal: true}) }><AwesomeButton type="primary" >Find a friend now!</AwesomeButton></div>
                    <div className={ this.state.showFriendModal ? 'modal' : 'none'}><FriendsSearchContainer off={()=> this.setState({showFriendModal: false})} /></div>
                </div>
            )
        }
        return (
            <div className="profile-friends-list">
            <ul>
                {this.props.current.friendIds.map(friendId => {
                    const friend = this.props.users.friends[friendId];
                  
                    return (

                        <li key={friendId}> 
                            <ProfileIcon user={friend} isCurrent={false}/>
                            {friend.username}
                            <div onClick={this.handleDeleteFriend(friendId)} 
                                    className='friend-delete-button'>
                                    <BsTrash />
                            </div>
                        </li>
                         
                    )
                   
                 })}
            </ul>
            <div className= 'find-frineds-button' onClick={() => this.setState({showFriendModal: true}) }><AwesomeButton type="primary" >Find a friend now!</AwesomeButton></div>
             <div className={ this.state.showFriendModal ? 'modal' : 'none'}><FriendsSearchContainer off={()=> this.setState({showFriendModal: false})} /></div>

        </div>
        )
        
    }   

    renderCompetitors(id) {
        const competitor = Object.values(this.props.users.friends).find(friend => friend.id === id)
        return (
            <>
                <div className="prof-stats-competitor">
                    <span className='prof-stats-icons'><ProfileIcon user={competitor} isCurrent={false}/></span>
                    {competitor.username}</div>
            </>
            
        )
    }

    renderStats() {

        return (
        <div className="prof-stats-div">
            <div className='stats-left-col'>
                <div className = "stats-header">Stats:</div>   
                <div className = "profile-points"> You've earned <br/> <span className="profile-points-bold">{this.props.users.current.points} </span>Points!</div>
            </div>
            
            <div className='stats-right-col'>
                    <div className='prof-winslosses-row'>{this.props.users.current.wins.length} Wins: 
                        <ul className= "render-competitors">
                            {this.props.users.current.wins.map((result, idx) => ( 
                                <li key={idx}>
                                    {this.renderCompetitors(result)}

                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='prof-winslosses-row'> {this.props.users.current.losses.length} Losses: </div>
            </div>
        </div>
        )

    }

    render() {
        
        if(!this.state.user || !this.state.decks) return (
            <div className='loading-spinner'>
                <div className="loadingio-spinner-ripple-9llcti0jtos"><div className="ldio-6bedd410xds">
                <div></div><div></div>
                </div></div>
                <style type="text/css"></style>
            </div>
        )
   
        
        return (
            <div className='user-profile-total-container' >
                 <div className='about-nav'>
                    <NavContainer/>
                </div>
                <div className= "search-friends-modal">

                </div>
                <div className='profile-content'>
                    <div className="profile-left-div">
                        <div className="profile-info-div">
                            <>
                                <div className="profile-user-info">

                                    <ProfileIcon className='profile-user-icon' user={this.props.users.current} updateUser={this.props.updateUser} isCurrent={true}/>
                                    <p>Hello, {this.props.users.current.username}!</p>

                                    <Link to="/profile/update">Edit profile</Link>
                                </div>
                                
                                <div className="profile-user-decks">
                                        <div className='profile-user-decks-header'>Your Decks</div>
                                
                                        {this.renderDecks()}
                                </div>
                                   
                                
                            </>
                        </div>
                        <div className="profile-vert-box">
                            <div className='profile-exp-bar'>
                                 <ExperienceBarContainer />
                            </div>
                            <div className="profile-battle-box">
                                <ChallengesContainer />
                            </div>
                            <div className="profile-stats-container">
                                 {this.renderStats()}
                            </div>
                        </div>
                    </div>
                    <div className="profile-right-div">
                        <div className= "profile-friends-header">
                               <>Friends</> 
                               <div onClick={() => this.setState({showFriendRequestModal : true})} 
                                    className = 'profile-new-friend-request'>
                                        {this.props.current.pendingRequests.length > 0 ? <img className = 'profile-new-friend-request-show' src={new_friend_icon} alt="new friend!" /> : ""}
                                </div> 
                                <div className={ this.state.showFriendRequestModal ? 'friend_request_modal' : 'none'}>
                                    <FriendsRequestContainer 
                                        off={()=> this.setState({showFriendRequestModal: false})} />
                                </div>
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