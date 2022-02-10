import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

class FriendsSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: props.friends,
            inputValue: '',
            list: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    friendFilterOnChange = (e) => {
        this.setState({inputValue: e.target.value})
    }
    componentDidMount() {
        this.setState({list: this.props.users})
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

    renderSearchResults() {
        if (this.state.list.length === 0 || !this.state.list) {
            return <div />
        } else { 
            return (
                <div>
                    {this.state.list.map(friend => (
                        <li className = 'friend-search-results-li'>
                            <img className='friend-search-thumbnail' src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                            {friend.username}
                            <button onClick={() => {
                                this.props.requestFriend({friendId: friend.id, requestType: 'request'})
                                    
                                }}>add friend</button>
                        </li>
                    ))}
                </div>
        ) }
    }

    render() {
        console.log("render -this.state.list", this.state.list)
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
                    <button className = "buttonX" onClick={() => this.props.off()}>x</button>
                </div>
                <div>
                    {this.renderSearchResults()}
                </div>
            </div>
        )

    }


    
}

export default withRouter(FriendsSearch)