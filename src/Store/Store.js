import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/Slice/authSlice';
import cartReducer from '../Redux/Slice/cartSlice';
import productsReducer from '../Redux/Slice/productsReducer';
import transactionsReducer from '../Redux/Slice/transactionsReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productsReducer,
        transactions: transactionsReducer,
    },
});

export default store;
