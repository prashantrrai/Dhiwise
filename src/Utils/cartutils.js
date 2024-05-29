export const loadCartItems = (dispatch, setCartItemsFromLocalStorage) => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
        dispatch(setCartItemsFromLocalStorage(storedCartItems));
    }
};
