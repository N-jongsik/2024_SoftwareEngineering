package com.se2024.motoo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MarketIndexDTO {
    private String bstp_nmix_prpr;        // 지수 현재가
    private String bstp_nmix_prdy_vrss;   // 전일 대비
    private String prdy_vrss_sign;        // 전일 대비 부호
    private String bstp_nmix_prdy_ctrt;   // 전일 대비율
}
