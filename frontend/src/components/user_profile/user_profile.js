import React from 'react';

class User_Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.currentUser

    }


    render_decks(decks) {
        if (decks.length === 0){
            return (
                <div className = 'profile-no-decks'>You haven't made any decks yet!</div>
            )
        }
    }

    render() {
        const decks = this.props.fetch_user_decks(this.state.deck_ids)
      
        return (
            <div className='profile-content'>
                {/* are we adding nav bar here or on app?? */}
                <div className="profile-left-div">
                    <div className="profile-info-div">
                        <div className="profile-user-info">
                            <img src="https://icons-for-free.com/iconfiles/png/512/home+page+profile+user+icon-1320184041392976124.png"> </img>
                            <p>{this.state.username}</p>
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

                    </div>
                </div>
            </div>
        )
    }
}