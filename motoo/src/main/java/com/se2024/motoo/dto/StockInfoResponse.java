package com.se2024.motoo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StockInfoResponse {
    private List<StockDTO> items;
    // Getter and Setter methods
}