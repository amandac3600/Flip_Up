import React from 'react';
import ProfileIcon from './profile_icon';
import './friend_requests.css'

export default class FriendRequests extends React.Component {

  renderRequest(friendIds, isIncoming) {
    if (!friendIds.length) return <div><br/>No requests pending</div>
  
    
    return (
      <div>
        {friendIds.map(friendId => {
          const friend = this.props.friends[friendId];
         

          let button1, button2;
          if (isIncoming) {
            button1 = <button onClick={() => this.props.requestFriend({ friendId: friendId, requestType: 'approve'})} className='friend-request-button'>Approve</button>
            button2 = <button onClick={() => this.props.requestFriend({ friendId: friendId, requestType: 'deny' })} className='friend-request-button'>Deny</button>
          } else {
            button1 = <button onClick={() => this.props.requestFriend({ friendId: friendId, requestType: 'cancel' })} className='friend-request-button'>Cancel</button>
          }

          return (
            <div key={friendId} className='friend-request-list-item'>
              <ProfileIcon user={friend} isCurrent={false} />

              <div className='friend-request-item-info'>
                <div>Username: {friend.username}</div>
                
                <div>
                  {button1}
                  {button2}
                </div>
              </div>


            </div>)
          })
        }

      </div>
    )
  }


  render() {
    if (!this.props.currentUser || !this.props.currentUser.outgoingRequests || !this.props.currentUser.pendingRequests || !this.props.friends) return null;

    return(
      <div className='friend-requests-div'>
        <div className='friend-request-header'>
          <div className='friend-requests-title'>Pending friend requests</div> 
          <button className = "buttonexit" onClick={() => this.props.off()}>X</button>
          </div>
        <div className='friend-requests-lists-div'>
          <div className='friend-requests-outgoing'>
            <div>Incoming friend requests:</div>
            {this.renderRequest(this.props.currentUser.pendingRequests, true)}
          </div>

          <div className='friend-requests-pending'>
            <div>Outgoing friend requests:</div>
            {this.renderRequest(this.props.currentUser.outgoingRequests, false)}
          </div>

        </div>
      </div>
    )
  }
}