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

    // 유가증권 단축 종목코드
    private String mkscShrnIscd;

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
}
