package com.se2024.motoo.controller;

import com.se2024.motoo.dto.MarketIndexDTO;
import com.se2024.motoo.dto.ResponseOutputDTO;
import com.se2024.motoo.dto.testDTO;
import com.se2024.motoo.dto.tickerDTO;
import com.se2024.motoo.service.KisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
public class KisController {
    private KisService kisService;

    @Autowired
    public KisController(KisService kisService) {
        this.kisService = kisService;
    }

    @GetMapping("/market-index")
    public Mono<MarketIndexDTO> getMarketIndex(@RequestParam String FID_INPUT_ISCD) { return kisService.getMarketIndex(FID_INPUT_ISCD); }
    @GetMapping("/volume-rank")
    public Mono<List<ResponseOutputDTO>> getVolumeRank() {
        return kisService.getVolumeRank();
    }

    @GetMapping("/increase-rank")
    public Mono<List<testDTO>> getIncreaseRank() {
        return kisService.getIncreaseRank();
    }

    @GetMapping("/decrease-rank")
    public Mono<List<testDTO>> getDecreaseRank() {
        return kisService.getDecreaseRank();
    }

    @GetMapping("/price")
    public Mono<List<tickerDTO>> getPrice(@RequestParam String ticker) {
        return kisService.getPirce(ticker);
    }

    @GetMapping("/kisstock")
    public Mono<List<tickerDTO>> getS(@RequestParam String ticker) {
        return kisService.getPirce(ticker);
    }

}
