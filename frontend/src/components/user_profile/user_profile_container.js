import {connect}  from 'react-redux';
import { fetchUser, fetchCurrentUser, getFriends, updateUser } from '../../actions/session_actions';

import { getDecks } from '../../actions/deck_actions'
import UserProfile from './user_profile'

const mSTP = state => {
    return {
    users: state.entities.users,
    friends: state.entities.friends,     
    }

};


const mDTP = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    getFriends: user_id => dispatch(getFriends(user_id)),
    getDecks: () => dispatch(getDecks()),
    updateUser: (user) => dispatch(updateUser(user)),
    // getFriends: () => dispatch(getFriends()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});

export default connect(mSTP, mDTP)(UserProfile);