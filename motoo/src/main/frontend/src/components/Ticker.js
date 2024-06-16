import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './TickerForm.css';  // 스타일 파일 추가

function TickerForm() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [orderType, setOrderType] = useState('buy');  // 매수/매도 구분
    const [quantity, setQuantity] = useState(0);
    const location = useLocation();
    const userID = location.state?.variable;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const srtnCd = searchParams.get('srtnCd');
        const itemName = searchParams.get('itmsNm');
        if (srtnCd) {
            fetchTickerInfo(srtnCd, itemName);
        }
    }, [location.search]);

    const fetchTickerInfo = async (srtnCd, itemName) => {
        try {
            const result = await axios.get(`/api/price`, {
                params: { ticker: srtnCd }
            });
            setResponse({ ...result.data[0], itmsNm: itemName, srtnCd: srtnCd });
            setError(null);
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    const handleOrderSubmit = async () => {
        try {
            const orderData = {
                userID: userID, // 사용자 ID를 여기에 설정
                itemName: response.itmsNm,
                srtnCd: response.srtnCd,
                transactionType: orderType,
                quantity,
                price: response.stck_prpr // 현재 주식 가격을 사용
            };
            await axios.post(`/api/order`, orderData);
            alert('주문이 성공적으로 접수되었습니다.');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('주문에 실패했습니다.');
            }
            console.error(error);
        }
    };

    if (!response) {
        return <p>Loading...</p>;
    }

    const getPriceChangeClass = () => {
        if (response.prdy_vrss_sign === '1' || response.prdy_vrss_sign === '2') {
            return 'up';
        } else if (response.prdy_vrss_sign === '3') {
            return 'flat';
        } else {
            return 'down';
        }
    };

    const getPriceChangeSymbol = () => {
        if (response.prdy_vrss_sign === '1' || response.prdy_vrss_sign === '2') {
            return '▲';
        } else if (response.prdy_vrss_sign === '3') {
            return '-';
        } else {
            return '▼';
        }
    };

    return (
        <div className="ticker-container">
            <h1>{response.itmsNm}</h1>
            <div className="ticker-header">
                <h2>{response.rprs_mrkt_kor_name}</h2>
                <p> ㅡ </p>
                <h2>{response.srtnCd}</h2>
            </div>
            <div className="ticker-price">
                <div className="price-info">
                    <div className="current-price">
                        <span>{response.stck_prpr}</span>원
                    </div>
                    <div className={`price-change ${getPriceChangeClass()}`}>
                        <span>{getPriceChangeSymbol()} {response.prdy_vrss}</span>
                        <span> | {response.prdy_ctrt}%</span>
                    </div>
                </div>
            </div>
            <div className="ticker-details">
                <div className="detail-row">
                    <div className="detail-column">
                        <span>PER:</span>
                        <span>{response.per}</span>
                    </div>
                    <div className="detail-column">
                        <span>PBR:</span>
                        <span>{response.pbr}</span>
                    </div>
                    <div className="detail-column">
                        <span>EPS:</span>
                        <span>{response.eps}</span>
                    </div>
                    <div className="detail-column">
                        <span>BPS:</span>
                        <span>{response.bps}</span>
                    </div>
                </div>
                <div className="detail-row">
                    <div className="detail-column">
                        <span>HTS 시가총액:</span>
                        <span>{response.hts_avls}</span>
                    </div>
                    <div className="detail-column">
                        <span>상장 주수:</span>
                        <span>{response.lstn_stcn}</span>
                    </div>
                </div>
                <div className="detail-row">
                    <div className="detail-column">
                        <span>업종 명:</span>
                        <span>{response.bstp_kor_isnm}</span>
                    </div>
                </div>
                {/* 더 많은 데이터 행 추가 가능 */}
            </div>
            <div className="order-form">
                <h3>매도/매수 주문</h3>
                <div className="order-type">
                    <label>
                        <input
                            type="radio"
                            name="orderType"
                            value="buy"
                            checked={orderType === 'buy'}
                            onChange={() => setOrderType('buy')}
                        />
                        매수
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="orderType"
                            value="sell"
                            checked={orderType === 'sell'}
                            onChange={() => setOrderType('sell')}
                        />
                        매도
                    </label>
                    <label>
                        수량:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        주문가격: {response.stck_prpr * quantity} 원
                    </label>
                </div>
                <button onClick={handleOrderSubmit}>주문하기</button>
            </div>
        </div>
    );
}

export default TickerForm;
