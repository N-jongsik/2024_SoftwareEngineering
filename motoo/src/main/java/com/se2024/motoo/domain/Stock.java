package com.se2024.motoo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "kospi_info")
@Getter
@Setter
@Table
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kdrIsin;
    private String korSecnNm;
    private String listDt;
    private String ovsListStkmkCd;
}
