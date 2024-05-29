// src/redux/actions/productsActions.js
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    createPurchaseOrderRequest,
    createPurchaseOrderSuccess,
    createPurchaseOrderFailure,
} from "../reducers/productsReducer";
import { getProducts } from "../../data/dummyData";

export const fetchProducts = () => async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
        const products = getProducts();
        dispatch(fetchProductsSuccess(products));
    } catch (error) {
        dispatch(fetchProductsFailure(error.message));
    }
};

export const createPurchaseOrder = (productId) => async (dispatch) => {
    dispatch(createPurchaseOrderRequest());
    try {
        const order = { id: Math.random().toString(), productId, amount: 100 }; // Dummy order
        dispatch(createPurchaseOrderSuccess(order));
    } catch (error) {
        dispatch(createPurchaseOrderFailure(error.message));
    }
};
