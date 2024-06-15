package com.se2024.motoo.controller;

import com.se2024.motoo.dto.StockInfoResponse;
import com.se2024.motoo.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/getStockInfo")
    public StockInfoResponse getStockInfo(@RequestParam("item_name") String itemName) {
        return stockService.getStockInfo(itemName);
    }
}