import React, { useEffect, useState, useRef, useMemo } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './PaymentModal.css';
import { GenerateOrder } from '../../Services/Orders/orders';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../Redux/Slice/cartSlice';
import { GetProductsById } from '../../Services/Product/Product';

Modal.setAppElement('#root');

const PaymentSuccess = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const [productDetails, setProductDetails] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const orderGeneratedRef = useRef(false);

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            closeModal();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleClearCart = () => {
        dispatch(clearCart());
        localStorage.removeItem('cartItems');
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productIds = cartItems.map((obj) => obj.id);
                const productDataPromises = productIds.map((productId) => GetProductsById(productId));
                const responses = await Promise.all(productDataPromises);
                const productData = responses.map(response => response.response);

                console.log('Fetched product details:', productData); // Debug statement
                setProductDetails(productData);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchProductDetails();
        }
    }, [cartItems]);

    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = productDetails.reduce((acc, curr) => {
                const cartItem = cartItems.find(ci => ci.id === curr?._id);

                console.log('Current product detail:', curr); // Debug statement
                console.log('Associated cart item:', cartItem); // Debug statement

                return acc + (curr?.price * (cartItem?.quantity ?? 0));
            }, 0);

            console.log('Calculated total amount:', total); // Debug statement
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [productDetails, cartItems]);

    const productsData = useMemo(() => cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity
    })), [cartItems]);

    const orderData = useMemo(() => ({
        products: productsData,
        totalAmount: totalAmount,
        status: "confirmed",
    }), [productsData, totalAmount]);

    console.log('productDetails', productDetails);
    console.log('orderData', orderData);

    useEffect(() => {
        if (totalAmount > 0) {
            const generateOrders = async () => {
                try {
                    await GenerateOrder(orderData);
                    handleClearCart();
                    orderGeneratedRef.current = true;
                } catch (error) {
                    console.error('Error generating orders:', error);
                }
            };

            if (productDetails.length > 0 && !orderGeneratedRef.current) {
                generateOrders();
            }
        }
    }, [productDetails, totalAmount]);

    return (
        <div className="payment-success-page">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Payment Success"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Payment Successful</h2>
                <p>Your payment was completed successfully!</p>
                <button onClick={closeModal}>Okay</button>
            </Modal>
        </div>
    );
};

export default PaymentSuccess;