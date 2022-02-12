import React, {useState, useEffect} from 'react';
import './profile_icon.css'

const renderIcons = () => {
  const iconOptions = document.querySelector('.profile-icon-options');
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
  const iconOptions = document.querySelector('.profile-icon-options');
  iconOptions.classList.toggle('hidden')
} 

const ProfileIcon = ({ user, updateUser, isCurrent = true}) => {
  console.log(user)
  const [icon, setIcon] = useState(user.icon);

  useEffect(() => {

    const profileIcon = document.querySelector(`.user-profile-icon.id${user.id}`);
    profileIcon.innerHTML = `&#${icon}`
    if (isCurrent) renderIcons();
  })

  const handleIconClick = (e) => {
    if (e.target.id === 'profile-icon-options') return;
    setIcon(e.target.id)
    updateUser({ icon: e.target.id})
  }
  return(
    <div className='user-profile-icon-div' onClick={isCurrent ? toggleIconOptions : () => {}}>
      <div className={`user-profile-icon id${user.id}`}></div>
      <div className='profile-icon-options hidden' onClick={handleIconClick}></div>
    </div>
  )
}

export default ProfileIcon;