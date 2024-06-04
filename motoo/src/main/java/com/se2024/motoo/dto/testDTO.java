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
public class testDTO {
    // HTS 한글 종목명
    @JsonProperty("hts_kor_isnm")
    private String htsKorIsnm;

    @JsonProperty("stck_shrn_iscd")
    private String stckShrnIscd;

    @JsonProperty("data_rank")
    private String dataRank;

    @JsonProperty("stck_prpr")
    private String stckPrpr;

    @JsonProperty("prdy_vrss_sign")
    private String prdyVrssSign;

    @JsonProperty("prdy_vrss")
    private String prdyVrss;

    @JsonProperty("prdy_ctrt")
    private String prdyCtrt;

    @JsonProperty("acml_vol")
    private String acmlVol;

    @JsonProperty("stck_hgpr")
    private String stckHgpr;

    @JsonProperty("hgpr_hour")
    private String hgprHour;

    @JsonProperty("acml_hgpr_date")
    private String acmlHgprDate;

    @JsonProperty("stck_lwpr")
    private String stckLwpr;

    @JsonProperty("lwpr_hour")
    private String lwprHour;

    @JsonProperty("acml_lwpr_date")
    private String acmlLwprDate;

    @JsonProperty("lwpr_vrss_prpr_rate")
    private String lwprVrssPrprRate;

    @JsonProperty("dsgt_date_clpr_vrss_prpr_rate")
    private String dsgtDateClprVrssPrprRate;

    @JsonProperty("cnnt_ascn_dynu")
    private String cnntAscnDynu;

    @JsonProperty("hgpr_vrss_prpr_rate")
    private String hgprVrssPrprRate;

    @JsonProperty("cnnt_down_dynu")
    private String cnntDownDynu;

    @JsonProperty("oprc_vrss_prpr_sign")
    private String oprcVrssPrprSign;

    @JsonProperty("oprc_vrss_prpr")
    private String oprcVrssPrpr;

    @JsonProperty("oprc_vrss_prpr_rate")
    private String oprcVrssPrprRate;

    @JsonProperty("prd_rsfl")
    private String prdRsfl;

    @JsonProperty("prd_rsfl_rate")
    private String prdRsflRate;
}
