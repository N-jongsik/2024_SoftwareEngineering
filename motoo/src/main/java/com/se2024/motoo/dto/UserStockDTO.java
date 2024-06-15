package com.se2024.motoo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStockDTO {
    private String userID;
    private String itemName;
    private String srtnCd;
    private Integer price;
    private Integer quantity;
    private String transactionType; // "buy" 또는 "sell"
}
