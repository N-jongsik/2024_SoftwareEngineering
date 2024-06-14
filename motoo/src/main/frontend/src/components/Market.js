import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Market() {
    const [stocks, setStocks] = useState([]);
    const [sortType, setSortType] = useState('volume-rank');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(sortType);
    }, [sortType]);

    const fetchData = async (sortType) => {
        setLoading(true);
        setError(null);  // Reset error state before new request
        try {
            const response = await axios.get("/api/" + sortType);
            if (Array.isArray(response.data)) {
                setStocks(response.data);
            } else {
                setError("Received data is not an array.");
                setStocks([]);  // Reset stocks to an empty array if data is not an array
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="stock-list">
            <h2>주식 종목 목록</h2>
            <div className="sort-buttons">
                <button onClick={() => setSortType('volume-rank')}>최다 거래량 순</button>
                <button onClick={() => setSortType('increase-rank')}>상승률 순</button>
                <button onClick={() => setSortType('decrease-rank')}>하락률 순</button>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <table className="stock-table">
                <thead>
                <tr>
                    <th>순위</th>
                    <th>종목명</th>
                    <th>종목코드</th>
                    <th>거래량</th>
                    <th>현재가</th>
                    <th>변화율</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((item, index) => (
                    <tr key={index}>
                        <td>{item.data_rank}</td>  {/* 순위 */}
                        <td>{item.hts_kor_isnm}</td> {/* 종목명 */}
                        <td>{item.stck_shrn_iscd}</td> {/* 종목코드  volume-rank에서는 mksc_shrn_iscd*/}
                        <td>{item.acml_vol}</td> {/* 거래량 */}
                        <td>{item.stck_prpr}</td> {/* 현재가 */}
                        <td>{item.prdy_ctrt} | <p>{item.prdy_vrss}</p></td>  {/* 현재가 +면 빨간색 -면 파란색 가능한가?*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Market;
