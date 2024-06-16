import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import './StockInfo.css';

Chart.register(...registerables, CandlestickController, CandlestickElement);

function StockInfo() {
    const [response, setResponse] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [itmsNm, setItmsNm] = useState('');
    const [srtnCd, setSrtnCd] = useState('');
    const [timeframe, setTimeframe] = useState('day');  // 기본적으로 일간 차트
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const srtnCd = searchParams.get('srtnCd');
        const itemName = searchParams.get('itmsNm');
        if (srtnCd) {
            setSrtnCd(srtnCd);
            setItmsNm(itemName);
            fetchTickerInfo(srtnCd);
            fetchChartData(srtnCd, timeframe);
        }
    }, [location.search, timeframe]);

    const fetchTickerInfo = async (srtnCd) => {
        try {
            const result = await axios.get(`/api/price`, {
                params: { ticker: srtnCd }
            });
            setResponse(result.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchChartData = async (srtnCd, period) => {
        try {
            const result = await axios.get(`/api/chart`, {
                params: { ticker: srtnCd, period: period }
            });
            setChartData(result.data.reverse());  // 최신-과거 순으로 변경
        } catch (error) {
            console.error(error);
            setChartData([]);
        }
    };

    const getChartData = useCallback(() => {
        if (!chartData || chartData.length === 0) return { datasets: [] };  // chartData가 없거나 비어있을 때 빈 객체 반환

        const datasets = [{
            label: `${itmsNm} ${timeframe === 'day' ? '일간' : timeframe === 'month' ? '월간' : '연간'} 차트`,
            data: chartData.map(data => ({
                x: new Date(`${data.stck_bsop_date.slice(0, 4)}-${data.stck_bsop_date.slice(4, 6)}-${data.stck_bsop_date.slice(6, 8)}`),
                o: data.stck_oprc,
                h: data.stck_hgpr,
                l: data.stck_lwpr,
                c: data.stck_clpr,
            })),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }];

        return {
            datasets
        };
    }, [chartData, itmsNm, timeframe]);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            chartInstanceRef.current = new Chart(ctx, {
                type: 'candlestick',
                data: getChartData(),
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        candlestick: {
                            barThickness: 1,  // 캔들스틱 너비를 작게 설정
                            categoryPercentage: 0.8,
                            barPercentage: 0.8,
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: timeframe === 'day' ? 'day' : timeframe === 'month' ? 'month' : 'year',
                                tooltipFormat: 'yyyy-MM-dd',
                                stepSize: timeframe === 'day' ? 1 : timeframe === 'month' ? 1 : 1,
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45,
                                autoSkip: true,
                                maxTicksLimit: 10  // 최대 표시할 라벨 수 제한
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString();  // 숫자 형식을 천단위 콤마로 표시
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const o = context.raw.o.toLocaleString();
                                    const h = context.raw.h.toLocaleString();
                                    const l = context.raw.l.toLocaleString();
                                    const c = context.raw.c.toLocaleString();
                                    return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
                                }
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10
                        }
                    }
                }
            });
        }
    }, [chartData, timeframe, getChartData]);

    if (!response) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <div className="header">
                <h1>{itmsNm}</h1>
                <h2>{srtnCd}</h2>
            </div>
            <div className="content">
                <table className="info-table">
                    <tbody>
                    <tr>
                        <td>종목 상태 구분 코드</td>
                        <td>{response.iscd_stat_cls_code}</td>
                    </tr>
                    <tr>
                        <td>증거금 비율</td>
                        <td>{response.marg_rate}</td>
                    </tr>
                    <tr>
                        <td>대표 시장 한글 명</td>
                        <td>{response.rprs_mrkt_kor_name}</td>
                    </tr>
                    <tr>
                        <td>업종 한글 종목명</td>
                        <td>{response.bstp_kor_isnm}</td>
                    </tr>
                    <tr>
                        <td>임시 정지 여부</td>
                        <td>{response.temp_stop_yn === 'Y' ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td>시가 범위 연장 여부</td>
                        <td>{response.oprc_rang_cont_yn === 'Y' ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td>종가 범위 연장 여부</td>
                        <td>{response.clpr_rang_cont_yn === 'Y' ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td>신용 가능 여부</td>
                        <td>{response.crdt_able_yn === 'Y' ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td>ELW 발행 여부</td>
                        <td>{response.elw_pblc_yn === 'Y' ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td>주식 현재가</td>
                        <td>{response.stck_prpr}</td>
                    </tr>
                    <tr>
                        <td>전일 대비</td>
                        <td>{response.prdy_vrss}</td>
                    </tr>
                    <tr>
                        <td>전일 대비 부호</td>
                        <td>{response.prdy_vrss_sign === '1' ? '+' : '-'}</td>
                    </tr>
                    <tr>
                        <td>전일 대비율</td>
                        <td>{response.prdy_ctrt}</td>
                    </tr>
                    <tr>
                        <td>누적 거래 대금</td>
                        <td>{response.acml_tr_pbmn}</td>
                    </tr>
                    <tr>
                        <td>누적 거래량</td>
                        <td>{response.acml_vol}</td>
                    </tr>
                    <tr>
                        <td>전일 대비 거래량 비율</td>
                        <td>{response.prdy_vrss_vol_rate}</td>
                    </tr>
                    <tr>
                        <td>주식 시가</td>
                        <td>{response.stck_oprc}</td>
                    </tr>
                    <tr>
                        <td>주식 최고가</td>
                        <td>{response.stck_hgpr}</td>
                    </tr>
                    <tr>
                        <td>주식 최저가</td>
                        <td>{response.stck_lwpr}</td>
                    </tr>
                    <tr>
                        <td>주식 상한가</td>
                        <td>{response.stck_mxpr}</td>
                    </tr>
                    <tr>
                        <td>주식 하한가</td>
                        <td>{response.stck_llam}</td>
                    </tr>
                    <tr>
                        <td>가중 평균 주식 가격</td>
                        <td>{response.wghn_avrg_stck_prc}</td>
                    </tr>
                    <tr>
                        <td>HTS 외국인 소진율</td>
                        <td>{response.hts_frgn_ehrt}</td>
                    </tr>
                    <tr>
                        <td>외국인 순매수 수량</td>
                        <td>{response.frgn_ntby_qty}</td>
                    </tr>
                    <tr>
                        <td>프로그램매매 순매수 수량</td>
                        <td>{response.pgtr_ntby_qty}</td>
                    </tr>
                    <tr>
                        <td>자본금</td>
                        <td>{response.cpfn}</td>
                    </tr>
                    <tr>
                        <td>주식 액면가</td>
                        <td>{response.stck_fcam}</td>
                    </tr>
                    <tr>
                        <td>주식 대용가</td>
                        <td>{response.stck_sspr}</td>
                    </tr>
                    <tr>
                        <td>HTS 매매 수량 단위 값</td>
                        <td>{response.hts_deal_qty_unit_val}</td>
                    </tr>
                    <tr>
                        <td>상장 주수</td>
                        <td>{response.lstn_stcn}</td>
                    </tr>
                    <tr>
                        <td>HTS 시가총액</td>
                        <td>{response.hts_avls}</td>
                    </tr>
                    <tr>
                        <td>PER</td>
                        <td>{response.per}</td>
                    </tr>
                    <tr>
                        <td>PBR</td>
                        <td>{response.pbr}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="chart-container">
                    <div className="button-container">
                        <button onClick={() => setTimeframe('day')}>일간</button>
                        <button onClick={() => setTimeframe('month')}>월간</button>
                        <button onClick={() => setTimeframe('year')}>연간</button>
                    </div>
                    <div className="chart">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockInfo;
