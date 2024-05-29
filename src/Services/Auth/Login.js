import axiosInstance from "../../API/axiosConfig";

export const Login = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
};