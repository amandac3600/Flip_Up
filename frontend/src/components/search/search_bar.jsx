import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { withRouter } from 'react-router-dom';
import "./search_bar.css"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      find: '',
      filters: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let cats = e.currentTarget.value.split(' ');
    this.setState({filters: cats})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.filters.join('+')}`);
  }

  render() {
    return (
      <div>
        <form className="search-bar-form" onSubmit={this.handleSubmit}>
          <div className="search-input-container">
            <input className="search-input" type="text" onChange={this.handleChange} placeholder="Enter categories separated by a space" value={this.state.filters.join(' ')}/>
          </div>
          <button className="search-button" type="submit" onClick={this.clearErrors}><AiOutlineSearch /></button>
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBar)

