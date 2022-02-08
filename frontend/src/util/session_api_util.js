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

// export const fetchUsers = () => {
//     return axios.get('/api/users')
// }

export const fetchUser = id => {
  return axios.get(`/api/users/find/${id}`)
}

export const editUser = (userData) => {
    return axios.patch('/api/users/update', userData)
}

// export const updateProfilePic = (userData)=>{
//   return axios.post('/api/users/updateProfilePic',userData)
// }
