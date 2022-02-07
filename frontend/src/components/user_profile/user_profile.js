import React from 'react';

class User_Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {/* are we adding nav bar here or on app?? */}
                <div className="profile-left-div">
                    <div className="profile-info-div">
                        <div className="profile-info-pic">

                        </div>
                        <div className='profile-user-detail'>

                        </div>
                    </div>
                    <div className="profile-deck-scroller">

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