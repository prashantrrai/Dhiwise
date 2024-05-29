import axiosInstance from "../../API/axiosConfig";

export const SignUpService = async (userData) => {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
};