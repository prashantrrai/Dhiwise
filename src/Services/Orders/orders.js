import axiosInstance from "../../API/axiosConfig";

export const GetOrderDetails = async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
};

export const GenerateOrder = async (productsData) => {
    const response = await axiosInstance.post('/orders/generate', productsData);
    return response.data;
};