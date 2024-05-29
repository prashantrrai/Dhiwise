import { createSlice } from '@reduxjs/toolkit';

// Function to load cart items from localStorage
const loadCartFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
};

const initialState = {
    items: loadCartFromLocalStorage(), // Initialize cart items from localStorage
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.items.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ id: productId, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.items.find(item => item.id === productId);
            if (product) {
                product.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.items.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCartItemsFromLocalStorage: (state, action) => {
            state.items = action.payload;
        }

    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, setCartItemsFromLocalStorage } = cartSlice.actions;
export const selectUniqueProductCount = (state) => state.cart.items.length;
export default cartSlice.reducer;
