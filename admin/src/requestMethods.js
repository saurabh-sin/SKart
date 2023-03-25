import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

let TOKEN = '';

const retrievedStoreStr = localStorage.getItem('persist:root'); // this is a string
const retrievedStore = JSON.parse(retrievedStoreStr); // this will be a JSON object
const reducer1 = retrievedStore.user;
// console.log(reducer1);
// should now have your reducer
const red2 = JSON.parse(reducer1);



if (red2.currentUser) {
  console.log(red2);
  TOKEN = red2.currentUser.token;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorisation: `${TOKEN}` },
});
