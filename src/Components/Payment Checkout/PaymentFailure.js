import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './PaymentModal.css';

Modal.setAppElement('#root');

const PaymentFailure = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const navigate = useNavigate();

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/'); // Redirect to home or any other page
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            closeModal();
        }, 3000); // Auto-close modal after 3 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="payment-failure-page">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Payment Failure"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Payment Failed</h2>
                <p>There was an issue processing your payment. Please try again.</p>
                <button onClick={closeModal}>Okay</button>
            </Modal>
        </div>
    );
};

export default PaymentFailure;
