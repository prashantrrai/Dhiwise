import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { GetProducts } from '../../Services/Product/Product';
import { useDispatch } from 'react-redux';
import { addToCart, setCartItemsFromLocalStorage } from '../../Slice/cartSlice';
import { loadCartItems } from '../../Utils/cartutils';

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId));
    };

    useEffect(() => {
        // Load cart items from localStorage
        loadCartItems(dispatch, setCartItemsFromLocalStorage);

        const fetchProducts = async () => {
            try {
                const data = await GetProducts();
                setProduct(data.response);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    return (
        <div className="product-page">
            <h1>Our Products</h1>
            {
                product.length === 0 ? (
                    <div className="notfound">
                        <p>No Products found</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {product.map(product => (
                            <div key={product._id} className="product-card">
                                <img src={product.Image} alt={product.name} className="product-image" />
                                <h2 className="product-name">{product.name}</h2>
                                <p className="product-description">{product.description}</p>
                                <div className="product-footer">
                                    <p className="product-price">₹ {product.price}</p>
                                    <button className="add-to-cart-button" onClick={() => handleAddToCart(product._id)}>Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    );
}


export default ProductDetails
