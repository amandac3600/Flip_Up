import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import ProfileIcon from './profile_icon';

class FriendsSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: props.friends,
            inputValue: '',
            list: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.addFriendButton = this.addFriendButton.bind(this)
    }

    friendFilterOnChange = (e) => {
        this.setState({inputValue: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.searchFriends(this.state.inputValue)
            .then((action) => {
                console.log('action.users', action.users)
                let friendList = action.users
                this.setState({list: friendList})
                friendList.length === 0 ? 
                    this.setState({list: friendList})
                    : 
                    this.setState(this.props.users)
                })
            
    }

    addFriendButton(id) {
        console.log("props.user", this.state.currentUser)
        if (this.props.currentUser.outgoingRequests.includes(id)) {
           return (
                <button className="friend-search-no-click-button" onClick={() => {
                    this.props.requestFriend({friendId: id, requestType: 'cancel'})
                }}>
                    Request Sent
                </button>)
        } else if (this.props.currentUser.friendIds.includes(id)) {
            return <button className="friend-search-no-click-button">YourFriend</button>   
        } else {
           return( <button onClick={() => {
                this.props.requestFriend({friendId: id, requestType: 'request'})
                }}>Add Friend</button> )
        } 
        
    }


    renderSearchResults() {
        // if (this.state.list.length === 0 || !this.state.list) {
        //     return <div />
        // } else { 
            console.log("inside render search res", this.state.list)
            return (
                <div><ul className ="friends-search-result">
                    {this.state.list.map(friend => (
                        <li className = 'friend-search-results-li'>
                                <ProfileIcon className='profile-user-icon' user={friend} updateUser={this.props.updateUser}/>                                {friend.username}
                                <div>{this.addFriendButton(friend.id)}</div>
                       
                        </li>
                    ))}
                    </ul>
                </div>
        ) 
    // }
    }

    render() {
        // console.log("render -this.state.list", this.state.list)
        console.log("render -this.state.friends", this.state.friends)
        let showList 
        this.state.list.length > 1 ? showList = 'block' : showList = 'none'
        if (!this.state.list) {
            return(<p>loading</p>)
        }
        return (
            <div className='friends-search' >
                <div className= "friends-search-header"> 
                    <div>
                        <form onSubmit={this.handleSubmit}>
                        <input type='search' value={this.state.inputValue} onChange= {this.friendFilterOnChange} placeholder="search for friends"/>
                        <button><AiOutlineSearch /></button>
                        </form>
                    </div>
                    <button className = "buttonX" onClick={() => this.props.off()}>X</button>
                </div>
                <div >
                    {this.renderSearchResults()}
                </div>
            </div>
        )

    }


    
}

export default withRouter(FriendsSearch)