import {connect}  from 'react-redux';
import { fetchUser } from '../../actions/session_actions';
// import { fetch_user_friends } from '../../actions/user_actions'
import { getDecks } from '../../actions/deck_actions'
import UserProfile from './user_profile'

const mSTP = state => {
    return {
    currentUser: state.session.user        
    }

};


const mDTP = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    //fetch_user_friends: user => dispatch(fetchUserFriends(user))
    getDecks: () => dispatch(getDecks())
});

export default connect(mSTP, mDTP)(UserProfile);