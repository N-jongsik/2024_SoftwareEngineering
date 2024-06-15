import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TickerForm.css'; // 기존의 TickerForm.css 파일을 사용

function Market() {
    const [stocks, setStocks] = useState([]);
    const [sortType, setSortType] = useState('volume-rank');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(sortType);
    }, [sortType]);

    const fetchData = async (sortType) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/" + sortType);
            if (Array.isArray(response.data)) {
                setStocks(response.data);
            } else {
                setError("Received data is not an array.");
                setStocks([]);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getPriceChangeClass = (prdy_vrss_sign) => {
        if (prdy_vrss_sign === '1' || prdy_vrss_sign === '2') {
            return 'up';
        } else if (prdy_vrss_sign === '3') {
            return 'flat';
        } else {
            return 'down';
        }
    };

    const getPriceChangeSymbol = (prdy_vrss_sign) => {
        if (prdy_vrss_sign === '1' || prdy_vrss_sign === '2') {
            return '▲';
        } else if (prdy_vrss_sign === '3') {
            return '-';
        } else {
            return '▼';
        }
    };

    const handleItemClick = (item) => {
        const srtnCd = sortType === 'volume-rank' ? item.mksc_shrn_iscd : item.stck_shrn_iscd;
        navigate(`/stockinfo?itmsNm=${item.hts_kor_isnm}&srtnCd=${srtnCd}`);
    };

    return (
        <div className="ticker-container">
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
                    <tr key={index} onClick={() => handleItemClick(item)}>
                        <td>{item.data_rank}</td>  {/* 순위 */}
                        <td>{item.hts_kor_isnm}</td> {/* 종목명 */}
                        <td>{sortType === 'volume-rank' ? item.mksc_shrn_iscd : item.stck_shrn_iscd}</td> {/* 종목코드 */}
                        <td>{item.acml_vol}</td> {/* 거래량 */}
                        <td>{item.stck_prpr}</td> {/* 현재가 */}
                        <td>
                            <div className={`price-change ${getPriceChangeClass(item.prdy_vrss_sign)}`}>
                                <span>{getPriceChangeSymbol(item.prdy_vrss_sign)} {item.prdy_vrss}</span>
                                <span> | {item.prdy_ctrt}%</span>
                            </div>
                        </td> {/* 변화율 */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Market;
