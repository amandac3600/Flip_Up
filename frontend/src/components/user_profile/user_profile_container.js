import {connect}  from 'react-redux';
// import { fetch_user_friends } from '../../actions/user_actions'
import User_Profile from './user_profile'

const mSTP = state => ({
    currentUser: state.session.user
});


const mDTP = dispatch => ({
    //fetch_user_friends: user => dispatch(fetchUserFriends(user))
    //fetch_user_decks: deck_id_arr => dispatch(fetchUserDecks(deck_id_arr))
});

export default connect(mSTP, mDTP)(User_Profile);