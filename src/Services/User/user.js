import axiosInstance from '../../API/axiosConfig';



export const getUsers = async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
};
