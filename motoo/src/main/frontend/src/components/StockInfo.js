import React, { useState } from 'react';
import axios from 'axios';

function StockInfoForm() {
    const [item_name, setItemName] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.get(`/api/getStockInfo`, {
                params: { item_name }
            });
            setResponse(result.data.items);
            setError(null);
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    return (
        <div className="stock-info-form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    종목명:
                    <input
                        type="text"
                        value={item_name}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <div className="error">Error: {error.message}</div>}
            {response && (
                <div className="response">
                    {response.map((item, index) => (
                        <div key={index} className="response-item">
                            <h2>{item.itmsNm}</h2>
                            <p>{item.srtnCd.substring(1)} | {item.mrktCtg} | {item.data_rank} {item.corpNm}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StockInfoForm;