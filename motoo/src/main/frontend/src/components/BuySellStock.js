import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

function BuySellStock() {
    const [itemName, setItemName] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
        navigate({
            pathname: `/ticker`,
            search: `srtnCd=${srtnCd}&itmsNm=${itmsNm}`
        });
    };

    return (
        <div className="stock-info-form">
            <form onSubmit={handleSubmit}>
                <label>
                    종목명:
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
        </div>
    );
}

export default BuySellStock;
