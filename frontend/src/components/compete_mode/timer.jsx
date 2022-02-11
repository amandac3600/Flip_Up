import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    this.startTime = this.startTime.bind(this);
  }




  

  componentDidMount() {
    setInterval(this.startTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.startTime);
  }

  startTime() {
    this.setState({ time: this.state.time + 1})
  }

  render() {
    const time = this.state.time;
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);

    return (
      <div>
      <div className='compete-timer-div'>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      </div>
    )

  }
}