import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

function BuySellStock({ isModal }) {
    const [itemName, setItemName] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.variable;

    const [modalIsOpen, setModalIsOpen] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!itemName.trim()) {
            setError('Stock name is required.');
            return;
        }
        try {
            const result = await axios.get(`/api/getStockInfo`, {
                params: { item_name: itemName }
            });
            setResponse(result.data.items);
            setError(null);
        } catch (error) {
            setError(error.message);
            setResponse(null);
        }
    };

    const handleItemSelect = (item) => {
        const { srtnCd, itmsNm } = item;
        navigate(`/ticker?srtnCd=${srtnCd}&itmsNm=${itmsNm}`, {
            state: { variable: userID }
        });
    };


    const closeModal = () => {
        setModalIsOpen(false);
        if (isModal) {
            navigate(location.state.backgroundLocation || "/", {
                state: { variable: userID }
            });
        }
    };

    return (
        <div className="stock-info-form">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="ReactModal__Content_bs"
                overlayClassName="ReactModal__Overlay"
            >
                <form onSubmit={handleSubmit}>
                    <label className="label_bs">
                        구매할 종목:
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="Enter stock name"
                            className="stock-input"
                        />
                    </label>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                {error && <div className="error-message">Error: {error}</div>}
                {response && response.length === 0 && (
                    <div className="error-message">No items found.</div>
                )}
                {response && response.length > 0 && (
                    <div className="stock-info-list">
                        {response.map((item) => (
                            <div key={item.srtnCd} className="stock-card" onClick={() => handleItemSelect(item)}>
                                <h2 className="stock-name">{item.itmsNm}</h2>
                                <p className="stock-details">
                                    <span className="stock-code">{item.srtnCd}</span> |
                                    <span className="stock-category">{item.mrktCtg}</span> |
                                    <span className="stock-rank">{item.data_rank}</span> |
                                    <span className="stock-corp-name">{item.corpNm}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default BuySellStock;
