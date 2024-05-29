import axios from 'axios';
// import config from '../Config/config';

const axiosInstance = axios.create({
    localURL: 'http://localhost:4040/api/v1',
    baseURL: 'https://dhiwise-backend.onrender.com/api/v1',
    timeout: 10000,
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

