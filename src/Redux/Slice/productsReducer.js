import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        productList: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchProductsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            state.loading = false;
            state.productList = action.payload;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createPurchaseOrderRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createPurchaseOrderSuccess: (state) => {
            state.loading = false;
        },
        createPurchaseOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    createPurchaseOrderRequest,
    createPurchaseOrderSuccess,
    createPurchaseOrderFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
