import React from 'react';


class FriendsSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: props.friends,
            inputValue: ''
        }
    }

    friendFilterOnChange = (e) => {
        this.setState({inputValue: e.target.value})
    }

    handleSubmit() {
        return 'hi'
    }

    render() {
        return (
            <div className='friends-search' >
                <div className= "friends-search-header"> 
                    <div>
                        <form onSubmit={this.handleSubmit}>
                        <label>Search:</label>
                        <input type='search' value={this.state.inputValue} onChange= {this.friendFilterOnChange}/>
                        <submit></submit>
                        </form>
                    </div>
                    <button onClick={() => this.props.off()}>x</button>
                </div>
                <ul>
                   
                </ul>
            </div>
        )

    }


    
}

export default FriendsSearch