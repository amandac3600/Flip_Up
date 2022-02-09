import axios from 'axios';

// We've been using this method in previos steps
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const fetchUsers = (keyword) => {
  if (keyword) {
    return axios.get(`/api/users/search/${keyword}`)
  } else {
    return axios.get('/api/users/search')
  }
}

// export const fetchUser = id => {
//   return axios.get(`/api/users/find/${id}`)
// }

export const fetchUser = () => {
  return axios.get(`/api/users/current`)
}

export const getFriends = () => {
  return axios.get(`/api/users/friends`)
}

export const editUser = (userData) => {
    return axios.patch('/api/users/update', userData)
}

// export const updateProfilePic = (userData)=>{
//   return axios.post('/api/users/updateProfilePic',userData)
// }
