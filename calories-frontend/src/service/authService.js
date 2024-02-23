import axios from './axios';
import { setJwtToken } from './axios';

export function setUserData(userData) {
  const user = JSON.stringify(userData);
  localStorage.setItem('user', user);
}

export function getUserData() {
  return JSON.parse(localStorage.getItem('user'));
}

export async function registerUser(email, userName, password) {
  const data = {
    email,
    username: userName,
    password,
    name: userName,
  };
  try {
    const response = await axios.post('/api/auth/local/register', data);
    return response;
  } catch (error) {
    return error.response.data.error;
  }
}

export async function login(email, password) {
  const data = {
    identifier: email,
    password,
  };
  try {
    const response = await axios.post('/api/auth/local', data);
    if (response.status === 200) {
      setJwtToken(response.data.jwt);
    }
    return response;
  } catch (error) {
    return error.response.data.error;
  }
}
