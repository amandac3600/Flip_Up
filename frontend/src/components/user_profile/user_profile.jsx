import React from 'react';
import NavContainer from '../nav/nav_container';
import Footer from '../footer/footer';
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
                                <p>{this.state.username}</p>
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