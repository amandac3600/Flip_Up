import React from 'react';
import { withRouter } from 'react-router-dom';
import "./card_form.css"

class CardForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.type === 'create') {
      this.state = {
        front: '',
        back: '',
        deckId: this.props.match.params.id
      };
    } else {
      this.state = {
        front: this.props.card.front,
        back: this.props.card.back
      };
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  //return whether or not the user is creating or editing a card
  getCardHeader() {
    if (this.props.type === 'create') {
      return ''
    } else {
      return 'Edit Card:'
    }
  }

  cardSubmit(e) {
    e.preventDefault();
    if (this.props.type === 'create') {
      this.props.submit(this.state).then(()=>{
        document.getElementById('card-form-front').value = ''
        document.getElementById('card-form-back').value = ''
      })
    } 
  }


  render() {
    console.log(this.props)
    return (
      <div className='create-form'>
        <div className='create-form-title'>{this.getCardHeader()}</div>
        <form onSubmit={this.cardSubmit.bind(this)}>
          <div>
            <input id='card-form-front' type="text"
              value={this.state.front}
              onChange={this.update('front')}
              placeholder="front"
            />
            <br />
            <input id='card-form-back' type="text"
              value={this.state.back}
              onChange={this.update('back')}
              placeholder="back"
            />
            <br />
            <input className='card-form-submit' type="submit" value="Create Card" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CardForm);