import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      find: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchBusinesses(this.state.find)
      .then(() => this.props.history.push(`/search/${this.state.find}`))
      .fail(() => this.props.history.push(`/search/${this.state.find}`))
  }

  clearErrors(e) {
    this.props.clearErrors()
  }

  render() {
    return (
      <div>
        <form className="search-bar-form" onSubmit={this.handleSubmit}>
          <div className="search-input-container">
            <input className="search-input" type="text" onChange={this.handleChange('find')} placeholder="animals, elementary, food..." />
          </div>
          <button className="search-button" type="submit" onClick={this.clearErrors}><AiOutlineSearch /></button>
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBar)

