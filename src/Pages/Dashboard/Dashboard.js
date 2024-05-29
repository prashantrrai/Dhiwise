import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    fetchPendingOrders,
    fetchTransactions,
} from "../../Redux/Actions/transactionsActions";
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    TextField,
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";
import { DatePicker } from "@mui/lab";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF3E96",
];

const Dashboard = () => {
    const dispatch = useDispatch();
    const { pendingOrders, transactions, loading, error } = useSelector(
        (state) => state.transactions
    );

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filteredPendingOrders, setFilteredPendingOrders] = useState([]);

    useEffect(() => {
        dispatch(fetchPendingOrders());
        dispatch(fetchProducts());
        dispatch(fetchTransactions());
    }, [dispatch]);

    useEffect(() => {
        setFilteredTransactions(transactions);
        setFilteredPendingOrders(pendingOrders);
    }, [transactions, pendingOrders]);

    useEffect(() => {
        if (startDate && endDate) {
            const filteredTrans = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                return transactionDate >= startDate && transactionDate <= endDate;
            });
            setFilteredTransactions(filteredTrans);

            const filteredOrders = pendingOrders.filter((order) => {
                const orderDate = new Date(order.date);
                return orderDate >= startDate && orderDate <= endDate;
            });
            setFilteredPendingOrders(filteredOrders);
        } else {
            setFilteredTransactions(transactions);
            setFilteredPendingOrders(pendingOrders);
        }
    }, [startDate, endDate, transactions, pendingOrders]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const salesData = filteredTransactions.map((transaction) => ({
        name: `Product ${transaction.productId}`,
        amount: transaction.amount,
    }));

    const paymentMethodsData = filteredTransactions.reduce((acc, transaction) => {
        const paymentMethod = transaction.paymentMethod;
        if (!acc[paymentMethod]) {
            acc[paymentMethod] = 0;
        }
        acc[paymentMethod] += transaction.amount;
        return acc;
    }, {});

    const paymentMethodsChartData = Object.keys(paymentMethodsData).map(
        (method) => ({
            name: method,
            amount: paymentMethodsData[method],
        })
    );

    const pendingOrdersData = filteredPendingOrders.map((order) => ({
        name: `Product ${order.productId}`,
        amount: order.amount,
    }));

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Dashboard & Demand Forecasting
            </Typography>
            <Box mb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box mb={3}>
                <Typography variant="h6">Sales Volume</Typography>
                <Paper>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
            <Box mb={3}>
                <Typography variant="h6">Payment Methods</Typography>
                <Paper>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={paymentMethodsChartData}
                                dataKey="amount"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {paymentMethodsChartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
            <Box mb={3}>
                <Typography variant="h6">Pending Orders</Typography>
                <Paper>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={pendingOrdersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
        </Container>
    );
};

export default Dashboard;
