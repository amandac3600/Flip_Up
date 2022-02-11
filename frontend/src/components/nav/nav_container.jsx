import { connect } from 'react-redux';
import { logout, fetchCurrentUser } from '../../actions/session_actions';
import Nav from './nav'

const mapStateToProps = (state) => {
  return ({
    // currentUser: state.entities.session.currentUserId,
    currentUser: state.session.user,
  })
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)

