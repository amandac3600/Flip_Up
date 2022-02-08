import {connect}  from 'react-redux';
import { fetchUser } from '../../actions/session_actions';
// import { fetch_user_friends } from '../../actions/user_actions'
import UserProfile from './user_profile'

const mSTP = state => ({
    currentUser: state.session.currentUser
});


const mDTP = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id))
    //fetch_user_friends: user => dispatch(fetchUserFriends(user))
    //fetch_user_decks: deck_id_arr => dispatch(fetchUserDecks(deck_id_arr))
});

export default connect(mSTP, mDTP)(UserProfile);