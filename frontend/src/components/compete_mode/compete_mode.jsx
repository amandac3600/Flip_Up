import React from 'react';


class CompeteMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      playerTime: '',
      playerCorrect: '',
    }
  }

  render() {
    return (
      <div>
        The winner will be determined by who gets the most question correct. If there is a tie, whoever finishes in the least amount of time will win.
      </div>
    );
  }
}

export default CompeteMode;