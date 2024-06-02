package com.se2024.motoo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class testDTO {
    // HTS 한글 종목명
    private String htsKorIsnm;
    // 주식 단축 종목코드
    private String stckShrnIscd;
    // 데이터 순위
    private String dataRank;
    // 주식 현재가
    private String stckPrpr;
    // 전일 대비 부호
    private String prdyVrssSign;
    // 전일 대비
    private String prdyVrss;
    // 전일 대비율
    private String prdyCtrt;
    // 누적 거래량
    private String acmlVol;
    // 주식 최고가
    private String stckHgpr;
    // 최고가 시간
    private String hgprHour;
    // 누적 최고가 일자
    private String acmlHgprDate;
    // 주식 최저가
    private String stckLwpr;
    // 최저가 시간
    private String lwprHour;
    // 누적 최저가 일자
    private String acmlLwprDate;
    // 최저가 대비 현재가 비율
    private String lwprVrssPrprRate;
    // 지정 일자 종가 대비 현재가 비율
    private String dsgtDateClprVrssPrprRate;
    // 연속 상승 일수
    private String cnntAscnDynu;
    // 최고가 대비 현재가 비율
    private String hgprVrssPrprRate;
    // 연속 하락 일수
    private String cnntDownDynu;
    // 시가 대비 현재가 부호
    private String oprcVrssPrprSign;
    // 시가 대비 현재가
    private String oprcVrssPrpr;
    // 시가 대비 현재가 비율
    private String oprcVrssPrprRate;
    // 기간 등락
    private String prdRsfl;
    // 기간 등락 비율
    private String prdRsflRate;
}
