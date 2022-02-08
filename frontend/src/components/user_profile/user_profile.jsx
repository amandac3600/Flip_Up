import React from 'react';
import './user_profile.css';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.currentUser.id

        }
        

    }

    componentDidMount() {
        console.log(this.props.fetchUser(this.state.id))
        this.props.fetchUser(this.state.id)
            .then(action => {
                this.setState({
                    username: action.currentUser.username, 
                    deck: action.currentUser.deck
            })})        
    }


    render_decks() {
        const decks = this.state.deck
        if (decks.length === 0){
            return (
                <h3 className = 'profile-no-decks'>You haven't made any decks yet!</h3>
            )
        }

        return (
            <div>
                {decks.map(deck => (
                    <li className="profile-deck-li">
                        {deck.name}
                    </li>
                ))}
            </div>
        )
    }

    render() {
        // const decks = this.props.fetch_user_decks(this.state.deck_ids)
        const user = this.state.username
        // console.log('in render', this.state)
        if(!user) return (
            <p> loading</p>
        )

        return (

            <div className='profile-content'>
                {/* are we adding nav bar here or on app?? */}
                <div className="profile-left-div">
                    <div className="profile-info-div">
                        <div className="profile-user-info">
                            <img src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png" alt="user profile pic" />
                            <p>Username: {this.state.username}</p>
                            <p>EDIT BUTTON GOES HERE</p>
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
                        <h3>Friends</h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserProfile 