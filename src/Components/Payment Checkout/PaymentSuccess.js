import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './PaymentModal.css';

Modal.setAppElement('#root');

const PaymentSuccess = () => {
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
