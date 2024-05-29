import axiosInstance from "../../API/axiosConfig";

export const SignUp = async (userData) => {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
};