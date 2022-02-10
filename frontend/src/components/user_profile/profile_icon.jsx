import React from 'react';

const profileIcon = document.getElementById('user-profile-icon');

const renderIcons = () => {
  const emojiCodeRanges = [128005, 128063]
  for (let i = emojiCodeRanges[0]; i < emojiCodeRanges[1]; i++) {
    profileIcon.append(`<span class='emoji' id='&#${i}'>&#${i}</span>`)
  }
}

const ProfileIcon = ({user}) => {
  const [icon, setIcon] = useState(user.icon);

  useEffect(() => {
    
    profileIcon.innerHTML = `&#${icon};`
  })



  return(
    <div id='user-profile-icon'></div>
  )
}

export default ProfileIcon;