import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function TickerForm() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [itmsNm, setItmsNm] = useState('');
    const [srtnCd, setSrtnCd] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const srtnCd = searchParams.get('srtnCd');
        const itemName = searchParams.get('itmsNm');
        if (srtnCd) {
            setSrtnCd(srtnCd); // srtnCd 상태 업데이트
            setItmsNm(itemName); // itmsNm 상태 업데이트
            fetchTickerInfo(srtnCd);
        }
    }, [location.search]);

    const fetchTickerInfo = async (srtnCd) => {
        try {
            const result = await axios.get(`/api/price`, {
                params: { ticker: srtnCd }
            });
            setResponse(result.data[0]);
            setError(null);
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    // 데이터가 없을 때 초기화
    if (!response) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h1 style={{ margin: '0' }}>{itmsNm}</h1>
                <h2 style={{ margin: '0' }}>{srtnCd}</h2>
            </div>
            <table style={{ width: '50%' }}>
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
                    <td>피벗 2차 디저항 가격</td>
                    <td>{response.pvt_scnd_dmrs_prc}</td>
                </tr>
                <tr>
                    <td>피벗 1차 디저항 가격</td>
                    <td>{response.pvt_frst_dmrs_prc}</td>
                </tr>
                <tr>
                    <td>피벗 포인트 값</td>
                    <td>{response.pvt_pont_val}</td>
                </tr>
                <tr>
                    <td>피벗 1차 디지지 가격</td>
                    <td>{response.pvt_frst_dmsp_prc}</td>
                </tr>
                <tr>
                    <td>피벗 2차 디지지 가격</td>
                    <td>{response.pvt_scnd_dmsp_prc}</td>
                </tr>
                <tr>
                    <td>디저항 값</td>
                    <td>{response.dmrs_val}</td>
                </tr>
                <tr>
                    <td>디지지 값</td>
                    <td>{response.dmsp_val}</td>
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
        </div>
    );
}

export default TickerForm;
