package com.se2024.motoo.domain;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class StockTransaction {
    private Integer price;
    private Integer quantity;
    private String transactionType; // "buy" 또는 "sell"
}
