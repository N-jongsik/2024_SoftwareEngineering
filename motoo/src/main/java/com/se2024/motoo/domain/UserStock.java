package com.se2024.motoo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid")
    private Member userID;

    @Column(length = 100)
    private String itemName;

    @Column(length = 10)
    private String srtnCd;

    @ElementCollection
    private List<StockTransaction> transactions = new ArrayList<>();

    @Column
    private Integer quantity;

    @Column
    private Double profitLoss; // 수익률을 저장할 필드
}
