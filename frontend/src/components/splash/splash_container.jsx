import { connect } from 'react-redux';
import Splash from './splash'
// import { clearErrors } from ;

const mapStateToProps = state => ({
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return {
  // clearErrors: () => dispatch(clearErrors())
}};

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
