import axiosInstance from '../../API/axiosConfig';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/user', userData);
    return response.data;
};

export const getUsers = async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
};
