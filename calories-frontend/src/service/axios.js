import axios from 'axios';

export function getJwtToken() {
  return localStorage.getItem('jwtToken');
}

export function setJwtToken(jwt) {
  localStorage.setItem('jwtToken', jwt);
}

export function removeLocalStorageItem(item) {
  localStorage.removeItem(item);
}

const instance = axios.create({
  withCredentials:true,
  headers: { 
    'Content-Type': 'application/json',
   },
   timeout: 3000,
});

export default instance;
