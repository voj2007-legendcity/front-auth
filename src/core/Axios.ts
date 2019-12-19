import i18n from '../i18n';
import axios, { AxiosInstance } from 'axios';

const Axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': i18n.language
  }
});
export default Axios;