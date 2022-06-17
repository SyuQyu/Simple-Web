import Axios from 'axios';

export const axios = Axios.create({
  baseURL: `http://localhost:5000/`,
  timeout: 3000,
  headers: {
    "Content-type": "application/json"
  }
});