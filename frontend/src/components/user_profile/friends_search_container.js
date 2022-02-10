import { connect } from 'react-redux';
import FriendsSearch from './friends_search'
import {fetchUsers} from '../../actions/session_actions'


const mapStateToProps = (state) => ({
  friends: Object.values(state.entities.users.friends),
  users: Object.values(state.entities.users)
})

const mapDispatchToProps = dispatch => ({
    searchFriends: (input) => dispatch(fetchUsers(input))
 
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSearch)

