import React, { useState } from 'react';
import axios from 'axios';

function StockInfoForm() {
    const [itemName, setItemName] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [stockDetail, setStockDetail] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result    = await axios.get(`/api/getStockInfo`, {
                params: { item_name: itemName }
            });
            setResponse(result.data.items);
            setError(null);
            setSelectedItem(null); // 새로운 종목 검색 시 선택된 항목 초기화
            setStockDetail(null); // 상세 정보 초기화
        } catch (error) {
            setError(error);
            setResponse(null);
            setStockDetail(null);
        }
    };

    const handleItemClick = async (item) => {
        try {
            const ticker = item.srtnCd; // srtnCd에서 첫 글자 제거
            const result = await axios.get(`/api/price`, {
                params: { ticker }
            });
            setStockDetail(result.data); // API 응답을 stockDetail로 설정
            setSelectedItem(item); // 선택된 항목 설정
            setError(null);
        } catch (error) {
            setError(error);
            setStockDetail(null);
        }
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
            {error && <div className="error-message">Error: {error.message}</div>}
            {stockDetail ? (
                <div className="stock-info-selected">
                    <h2>{stockDetail.rprs_mrkt_kor_name}</h2>
                    <p>Stock Price: {stockDetail.stck_prpr}</p>
                    <p>Daily Variation: {stockDetail.prdy_vrss}</p>
                </div>
            ) : (
                response && (
                    <div className="stock-info-list">
                        {response.map((item, index) => (
                            <div key={index} className="stock-card" onClick={() => handleItemClick(item)}>
                                <h2 className="stock-name">{item.itmsNm}</h2>
                                <p className="stock-details">
                                    <span className="stock-code">{item.srtnCd.substring(1)}</span> |
                                    <span className="stock-category">{item.mrktCtg}</span> |
                                    <span className="stock-rank">{item.data_rank}</span> |
                                    <span className="stock-corp-name">{item.corpNm}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default StockInfoForm;
