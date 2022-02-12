import { connect } from 'react-redux';
import { fetchCurrentUser, updateUser } from '../../actions/session_actions';
import UpdateUserForm from './update_user_form';



const mSTP = (state, ownProps) => {
    return {
      user: state.entities.users.current,
      errors: state.errors.session
    }
}

const mDTP = dispatch => ({
    updateUser: data => dispatch(updateUser(data)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser())

})

export default connect(mSTP, mDTP)(UpdateUserForm)