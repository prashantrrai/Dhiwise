import axiosInstance from "../../API/axiosConfig";

export const PaymentCheckout = async (checkoutItems) => {
    const response = await axiosInstance.post('/payment/checkout', checkoutItems);
    return response.data;
};