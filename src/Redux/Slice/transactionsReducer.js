import { createReducer } from "@reduxjs/toolkit";
import {
    fetchPendingOrders,
    fetchProducts,
    fetchTransactions,
} from "../Actions/transactionsActions";

const initialState = {
    products: [],
    transactions: [],
    pendingOrders: [],
    loading: false,
    error: null,
};

const transactionsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchPendingOrders, (state, action) => {
            state.pendingOrders = action.payload;
        })
        .addCase(fetchProducts, (state, action) => {
            state.products = action.payload;
        })
        .addCase(fetchTransactions, (state, action) => {
            state.transactions = action.payload;
        });
});

export default transactionsReducer;
