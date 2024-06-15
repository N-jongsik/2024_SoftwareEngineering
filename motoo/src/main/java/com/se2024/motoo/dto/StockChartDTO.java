package com.se2024.motoo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockChartDTO {
    private String stck_bsop_date;
    private Integer stck_clpr;
    private Integer stck_oprc;
    private Integer stck_hgpr;
    private Integer stck_lwpr;
    private Long acml_vol;
    private Long acml_tr_pbmn;
}
