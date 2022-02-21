import React, {useState, useEffect} from 'react';
import './profile_icon.css'

const renderIcons = () => {
  const iconOptions = document.querySelector('.profile-icon-options');
  iconOptions.innerHTML = '';
  if (!iconOptions) return null;

  const iconText = document.createElement('div');
  iconText.setAttribute('class', 'profile-iconText');
  iconText.innerText = 'Select an Emoji to change your icon.';
  iconOptions.append(iconText);
  
  const emojiCodeRanges = [128005, 128063]

  for (let i = emojiCodeRanges[0]; i < emojiCodeRanges[1]; i++) {
    const icon = document.createElement('div');
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
  const [icon, setIcon] = useState(user.icon);

  const listener = (e) => {
    const box = document.querySelector('.profile-icon-options');
    if (!box.contains(e.target)) {
      box.classList.add('hidden');
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', listener);
    const profileIcon = document.querySelector(`.user-profile-icon.id${user.id}`);
    profileIcon.innerHTML = `&#${icon}`
    if (isCurrent) renderIcons();

    return (() => {
      document.removeEventListener('mouseup', listener);
    })
  })

  const handleIconClick = (e) => {
    if (!e.target.id) return;
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