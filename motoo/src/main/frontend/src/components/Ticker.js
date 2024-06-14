import React, { useState } from 'react';
import axios from 'axios';

function TickerForm() {
    const [ticker, setTicker] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => { //주식 검색 엔터 누르면 api
        event.preventDefault();
        try {
            const result = await axios.get(`/api/price`, {
                params: { ticker }
            });
            setResponse(result.data[0]);
            setError(null);
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    return (
        <div className="ticker-form-container">
            <form onSubmit={handleSubmit} className="ticker-form">
                <label className="ticker-label">
                    Ticker:
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        className="ticker-input"
                    />
                </label>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {error && <div className="error-message">Error: {error.message}</div>}
            {response && (
                <div className="response-container">
                    <h2>{response.rprs_mrkt_kor_name}</h2>
                    <p>Stock Price: {response.stck_prpr}</p>
                    <p>Daily Variation: {response.prdy_vrss}</p>
                </div>
            )}
        </div>
    );
}

export default TickerForm;
