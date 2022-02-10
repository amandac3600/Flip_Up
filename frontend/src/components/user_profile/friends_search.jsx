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
                <ul>
                {this.state.list.map(friend => (
                    <li>
                        {friend.username}
                        <button>add friend</button>
                    </li>
                ))}
                   
                </ul>
            </div>
        )

    }


    
}

export default withRouter(FriendsSearch)