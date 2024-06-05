package com.se2024.motoo.controller;
import com.se2024.motoo.dto.StockDTO;
import com.se2024.motoo.service.StockService ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kospi")
public class StockController {

    @Autowired
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/save")
    public String saveKOSPIInfo() {
        StockDTO kospiInfoDTO = stockService.getKOSPIInfoFromAPI();
        if (kospiInfoDTO != null) {
            stockService.saveKOSPIInfo(kospiInfoDTO);
            return "KOSPI Info saved successfully!";
        }
        return "Failed to fetch KOSPI Info!";
    }
}