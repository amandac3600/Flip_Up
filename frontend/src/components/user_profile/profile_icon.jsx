import React, {useState, useEffect} from 'react';
import './profile_icon.css'

const renderIcons = () => {
  const iconOptions = document.getElementById('profile-icon-options');
  iconOptions.innerHTML = '';
  if (!iconOptions) return null;
  const emojiCodeRanges = [128005, 128063]

  for (let i = emojiCodeRanges[0]; i < emojiCodeRanges[1]; i++) {
    const icon = document.createElement('span');
    icon.setAttribute('class', 'profile-icon');
    icon.setAttribute('id', `${i}`);
    icon.innerHTML = `&#${i}`;
    iconOptions.append(icon)
  }
}

const toggleIconOptions = () => {
  const iconOptions = document.getElementById('profile-icon-options');
  iconOptions.classList.toggle('hidden')
} 

const ProfileIcon = ({ user, updateUser, isCurrent = true}) => {
  const [icon, setIcon] = useState(user.icon);

  useEffect(() => {
    const profileIcon = document.getElementById('user-profile-icon');
    profileIcon.innerHTML = `&#${icon}`
    if (isCurrent) renderIcons();
  })

  const handleIconClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === 'profile-icon-options') return;
    setIcon(e.target.id)
    updateUser({ icon: e.target.id})
  }
  
  return(
    <div className='user-profile-icon-div' onClick={toggleIconOptions}>
      <div id='user-profile-icon'></div>
      <div id='profile-icon-options' className='hidden' onClick={handleIconClick}></div>
    </div>
  )
}

export default ProfileIcon;