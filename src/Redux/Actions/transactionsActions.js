import { createAction } from "@reduxjs/toolkit";

export const dummyData = {
    products: [
        {
            id: "1",
            name: "Product 1",
            description: "Description for Product 1",
            price: 100,
        },
        {
            id: "2",
            name: "Product 2",
            description: "Description for Product 2",
            price: 150,
        },
        {
            id: "3",
            name: "Product 3",
            description: "Description for Product 3",
            price: 200,
        },
        {
            id: "4",
            name: "Product 4",
            description: "Description for Product 4",
            price: 400,
        },
        {
            id: "5",
            name: "Product 5",
            description: "Description for Product 5",
            price: 500,
        },
        {
            id: "6",
            name: "Product 6",
            description: "Description for Product 6",
            price: 180,
        },
    ],
    transactions: Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        productId: `${(i % 6) + 1}`, // Reference all 6 products
        customerId: `customer${i + 1}`,
        amount: 100 + (i % 6) * 50,
        date: new Date(2024, 4, i + 1).toISOString(),
        paymentMethod:
            i % 3 === 0 ? "Credit Card" : i % 3 === 1 ? "PayPal" : "Bank Transfer",
    })),
    pendingOrders: Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        productId: `${(i % 6) + 1}`, // Reference all 6 products
        amount: 100 + (i % 6) * 50,
        date: new Date(2024, 4, i + 1).toISOString(),
        status: "Pending",
    })),
};

export const fetchPendingOrders = createAction("FETCH_PENDING_ORDERS", () => {
    return {
        payload: dummyData.pendingOrders,
    };
});

export const fetchProducts = createAction("FETCH_PRODUCTS", () => {
    return {
        payload: dummyData.products,
    };
});

export const fetchTransactions = createAction("FETCH_TRANSACTIONS", () => {
    return {
        payload: dummyData.transactions,
    };
});
