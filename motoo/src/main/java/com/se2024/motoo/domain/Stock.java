package com.se2024.motoo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "kospi_info")
public class Stock {
    @Id
    private String kdrIsin;

    @Column
    private String korSecnNm;

    @Column
    private String listDt;

    @Column
    private String ovsListStkmkCd;
}