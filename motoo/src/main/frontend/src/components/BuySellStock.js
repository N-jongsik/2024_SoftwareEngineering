import React, { useState } from 'react';
import axios from 'axios';

function BuySellStock() {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [transactionType, setTransactionType] = useState('buy');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post('/api/transaction', {
                ticker,
                quantity,
                price,
                transactionType
            });
            setResponse(result.data);
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
            setResponse(null);
        }
    };

    return (
        <div className="buy-sell-stock-container">
            <h1>{transactionType === 'buy' ? 'Buy Stock' : 'Sell Stock'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Ticker:
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Transaction Type:
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </label>
                <button type="submit">{transactionType === 'buy' ? 'Buy' : 'Sell'}</button>
            </form>
            {error && <div className="error">Error: {error}</div>}
            {response && (
                <div className="success">
                    {transactionType === 'buy' ? 'Purchase' : 'Sale'} successful: {response.message}
                </div>
            )}
        </div>
    );
}

export default BuySellStock;
