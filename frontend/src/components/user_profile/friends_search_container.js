import { connect } from 'react-redux';
import FriendsSearch from './friends_search'
import {fetchUsers, requestFriend} from '../../actions/session_actions'


const mapStateToProps = (state) => ({
  currentUser: state.session.user,
  friends: Object.values(state.entities.users.friends),
  users: Object.values(state.entities.users)
})

const mapDispatchToProps = dispatch => ({
    searchFriends: (input) => dispatch(fetchUsers(input)),
    requestFriend: (input) => dispatch(requestFriend(input))
  
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSearch)

