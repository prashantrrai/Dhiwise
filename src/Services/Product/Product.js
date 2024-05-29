import axiosInstance from '../../API/axiosConfig';

export const CreateProduct = async (productData) => {
    const response = await axiosInstance.post('/product/create', productData);
    return response.data;
};

export const GetProducts = async () => {
    const response = await axiosInstance.get('/product');
    return response.data;
};

export const GetProductsById = async (Id) => {
    const response = await axiosInstance.get(`/product/${Id}`);
    return response.data;
};