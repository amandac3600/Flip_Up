import { connect } from 'react-redux';
import { fetchCurrentUser, getFriends, requestFriend } from '../../actions/session_actions';
import FriendRequests from './friend_requests';

const mapStateToProps = state => ({
  currentUser: state.session.user,
  friends: state.entities.users.friends
});


const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  getFriends: user_id => dispatch(getFriends(user_id)),
  requestFriend: (friendId, requestType) => dispatch(requestFriend(friendId, requestType))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);