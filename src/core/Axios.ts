import axios, { AxiosInstance } from 'axios';
const Axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});
export default Axios;