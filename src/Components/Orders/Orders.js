import React, { useEffect, useState } from 'react';
import './Orders.css';
import { GetOrderDetails } from '../../Services/Orders/orders'

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await GetOrderDetails();
                setOrders(response.response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No Order Found</p>
            ) :
                (
                    <div className="orders-list">
                        {orders?.map((order, index) => (
                            <div key={`${order?._id}-${index}`} className="order-card">
                                <div className='header-main'>
                                    <h2>Order #{order?._id}</h2>
                                    <div className={`status-badge ${order?.status === "confirmed" ? 'success' : 'failed'}`}>
                                        {order?.status}
                                    </div>
                                </div>

                                <div className="order-details">
                                    {order?.products.map((item, index) => (
                                        <div key={`${item?._id}-${index}`} className="product-details">
                                            <img src={item?.productDetails?.Image} alt={item?.productDetails.name} className="product-image" />
                                            <div className="product-info">
                                                <h3>{item?.productDetails.name}</h3>
                                                <p>Quantity: {item?.quantity}</p>
                                                <p style={{ fontWeight: 'bold' }}>Price: ₹ {order?.totalAmount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Orders;
