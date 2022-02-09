import {connect}  from 'react-redux';
import { fetchUser, getFriends } from '../../actions/session_actions';
import { getDecks } from '../../actions/deck_actions'
import UserProfile from './user_profile'

const mSTP = state => {
    return {
    currentUser: state.session.user        
    }

};


const mDTP = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    getFriends: user_id => dispatch(getFriends(user_id)),
    getDecks: () => dispatch(getDecks())
});

export default connect(mSTP, mDTP)(UserProfile);