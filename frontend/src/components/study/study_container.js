import { connect } from 'react-redux';
import Study from './study';
import { getDeck } from './../../actions/deck_actions'



const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeck: (id)=>dispatch(getDeck(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Study);