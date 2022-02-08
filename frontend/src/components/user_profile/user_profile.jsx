import React from 'react';
import './user_profile.css';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        console.log("in constructor", props.currentUser)
        this.state = {
         
            id: props.currentUser.id

        }
        

    }

    componentDidMount() {
        console.log("fetchUser", this.props.fetchUser)
        this.props.fetchUser(this.state.id)
            .then((user => this.setState({username : user.username})))        
    }


    // render_decks(decks) {
    //     if (decks.length === 0){
    //         return (
    //             <div className = 'profile-no-decks'>You haven't made any decks yet!</div>
    //         )
    //     }
    // }

    render() {
        // const decks = this.props.fetch_user_decks(this.state.deck_ids)
        const user = this.state
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
                            <p>id {this.state.username}</p>
                            <p>EDIT BUTTON GOES HERE</p>
                        </div>
                        <div className='profile-user-stats'>
                            <p>Wins</p>
                            <p>Loses</p>
                            <p>Points</p>
                        </div>
                    </div>
                    <div className="profile-deck-scroller">
                        <ul>

                        </ul>
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