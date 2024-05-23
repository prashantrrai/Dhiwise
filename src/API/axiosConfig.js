import axios from 'axios';
// import config from '../Config/config';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4040/api/v1',
    timeout: 10000,
});

export default axiosInstance;

