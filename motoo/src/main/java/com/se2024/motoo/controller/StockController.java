package com.se2024.motoo.controller;

import com.se2024.motoo.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/saveKOSPIInfo")
    public String saveKOSPIInfo() {
        stockService.getKOSPIInfoFromAPI();
        return "KOSPI Info Saved!";
    }
}
