import React from 'react';
import { withRouter } from 'react-router-dom';
import "./experienceBar.css";

class ExperienceBar extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUser(this.props.currentUser.id)
  }

  componentDidUpdate() {
    this.calculateExpBar()
  }

  calculateExpBar() {
    if (!this.props.users.current) return
    this.calculated = true;
    let oldWidth = document.getElementById('exp-bar').style.width
    oldWidth = oldWidth.slice(0, oldWidth.length - 1)
    let newWidth = (this.exp / this.cap)*100
    oldWidth = parseInt(oldWidth, 10)
    setTimeout(function moveExp(){
      oldWidth += 0.05;
      document.getElementById('exp-bar').style.width = `${oldWidth}%`
      if (oldWidth < newWidth) {
        setTimeout(moveExp, 1)
      }
    }, 1)
    
  }

  getCurrentLevel() {
    return `Lvl ${this.level}`
  }

  getNextLevel() {
    return `Lvl ${this.level + 1}`
  }

  render() { 
    if (!this.props.users.current) return <div></div>
    this.exp = this.props.users.current.points
    this.cap = 100;
    this.level = 1;
    if (this.exp < 300 && this.exp > 100) {
    this.level = 2;
    this.cap = 300;
    } else if (this.exp < 600 && this.exp > 300) {
    this.level = 3;
    this.cap = 600;
    } else if (this.exp < 1100 && this.exp > 600) {
    this.level = 4
    this.cap = 1100;
    }
    
    return (
      <div>
          <div className='experience-bar-level' >
          <div>{this.getCurrentLevel()}</div>
            <div>{this.getNextLevel()}</div>
          </div>
          <div className='experience-bar-container' >
            <div className="meter red">
              <span id='exp-bar' style={{width: '0%'}}></span>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(ExperienceBar);