import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slice/authSlice';
import cartReducer from '../Slice/cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});

export default store;
