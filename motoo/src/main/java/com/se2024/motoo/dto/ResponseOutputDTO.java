package com.se2024.motoo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ResponseOutputDTO {
    // HTS 한글 종목명
    @JsonProperty("hts_kor_isnm")
    private String htsKorIsnm;

    // 유가증권 단축 종목코드
    @JsonProperty("mksc_shrn_iscd")
    private String mkscShrnIscd;

    // 데이터 순위
    @JsonProperty("data_rank")
    private String dataRank;

    // 주식 현재가
    @JsonProperty("stck_prpr")
    private String stckPrpr;

    // 전일 대비 부호
    @JsonProperty("prdy_vrss_sign")
    private String prdyVrssSign;

    // 전일 대비
    @JsonProperty("prdy_vrss")
    private String prdyVrss;

    // 전일 대비율
    @JsonProperty("prdy_ctrt")
    private String prdyCtrt;

    // 누적 거래량
    @JsonProperty("acml_vol")
    private String acmlVol;

    // 전일 거래량
    //private String prdyVol;

    // 상장 수주
    @JsonProperty("lstn_stcn")
    private String lstnStcn;

    // 평균 거래량
    @JsonProperty("avrg_vol")
    private String avrgVol;

    // N일전종가대비현재가대비율
    //private String nBefrClprVrssPrprRate;

    // 거래량 증가율
    @JsonProperty("vol_inrt")
    private String volInrt;

    // 거래량 회전율
    //private String volTnrt;

    // N일 거래량 회전율
    //private String ndayVolTnrt;

    // 평균 거래 대액
    //private String avrgTrPbmn;

    // 거래대금회전률
    //private String trPbmnTnrt;

    // N일 거래대금 회전율
    //private String ndayTrPbmnTnrt;

    // 누적 거래 대금
    //private String acmlTrPbmn;
}
