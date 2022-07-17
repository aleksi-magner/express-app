import axios from 'axios';

document.cookie = 'expires=Thu, 18-Dec-3000 12:00:00 UTC; SameSite=Strict';

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND : 'http://localhost:8080';

const httpClient = axios.create({
  baseURL,
  timeout: 5000,
  responseType: 'json',
  responseEncoding: 'utf8',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    get: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    put: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    delete: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

export default httpClient;
