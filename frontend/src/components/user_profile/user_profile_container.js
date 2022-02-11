import {connect}  from 'react-redux';
import { fetchUser, getFriends, updateUser } from '../../actions/session_actions';
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
    getDecks: () => dispatch(getDecks()),
    updateUser: (user) => dispatch(updateUser(user))
});

export default connect(mSTP, mDTP)(UserProfile);