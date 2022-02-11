import { connect } from 'react-redux';
import ExperienceBar from './experience_bar';
import { fetchUser } from './../../actions/session_actions'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    users: state.entities.users,
    points: state.session.user.points
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id)=>dispatch(fetchUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceBar);