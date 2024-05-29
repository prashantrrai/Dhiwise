import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart, setCartItemsFromLocalStorage } from '../../Redux/Slice/cartSlice';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { GetProductsById } from '../../Services/Product/Product';
import { loadCartItems } from '../../Utils/cartutils';
import { toast } from 'react-toastify';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);

    // Calculate total amount
    const totalAmount = product.reduce((total, item) => {
        const cartItem = cartItems.find(ci => ci.id === item?._id);
        return total + (item?.price * (cartItem?.quantity ?? 0));
    }, 0);

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        loadCartItems(dispatch, setCartItemsFromLocalStorage);
    }, [dispatch]);

    // Update localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Fetch product details based on cart items
    useEffect(() => {
        const fetchProducts = async () => {
            if (cartItems.length === 0) {
                setProduct([]);
                return;
            }

            try {
                const productIds = cartItems.map((obj) => obj.id);
                const productDataPromises = productIds.map((productId) => GetProductsById(productId));
                const responses = await Promise.all(productDataPromises);
                const productData = responses.map(response => response.response);

                setProduct(productData);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, [cartItems]);

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast.success('Item Removed from Cart', {
            position: 'top-center'
        });
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.error('All Items Removed', {
            position: 'top-center'
        });
    };

    const handleCheckout = () => {
        navigate('/payment/checkout');
    };

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {product?.map((item) => {
                        const cartItem = cartItems?.find(cartItem => cartItem?.id === item?._id);
                        return (
                            <div key={item?._id} className="cart-item">
                                <div className='cart-item-image-container'>
                                    <img src={item?.Image} alt={item?.name} className="cart-item-image" />
                                </div>
                                <div className="cart-item-details">
                                    <h2>{item?.name}</h2>
                                    <p>{item?.description}</p>
                                    <div className="cart-item-row">
                                        <div className="cart-item-quantity">
                                            <button onClick={() => handleDecrement(item?._id)}>-</button>
                                            <span>{cartItem?.quantity ?? 0}</span>
                                            <button onClick={() => handleIncrement(item?._id)}>+</button>
                                        </div>
                                        <p className="cart-item-price">₹ {item?.price * (cartItem?.quantity ?? 0)}</p>
                                        <div className='remove-btn-container'>
                                            <button onClick={() => handleRemove(item?._id)} className="remove-button">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="cart-summary">
                        <div className='cart-total-wrap'>
                            <p className="cart-total">Total Amount: ₹ {totalAmount}</p>
                        </div>
                        <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
                        <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
