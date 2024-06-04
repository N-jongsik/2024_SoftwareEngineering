package com.se2024.motoo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.se2024.motoo.domain.Stock;
import com.se2024.motoo.dto.StockDTO;
import com.se2024.motoo.dto.tickerDTO;
import com.se2024.motoo.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository repository;

    @Value("${service_key}")
    private String serviceKey;
    public void saveKOSPIInfo(StockDTO dto) {
        Stock kospiInfo = new Stock();
        kospiInfo.setKdrIsin(dto.getKdrIsin());
        kospiInfo.setKorSecnNm(dto.getKorSecnNm());
        kospiInfo.setListDt(dto.getListDt());
        kospiInfo.setOvsListStkmkCd(dto.getOvsListStkmkCd());
        repository.save(kospiInfo);
    }

    public StockDTO getKOSPIInfoFromAPI() {
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "http://api.seibro.or.kr/openapi/service/StockSvc/getKDRSecnInfo?serviceKey=WkiWHxfMQMxWZ2BFbkUi62BgCOv+CMoPtKMQnU/8hViLc0Dl+meP1koWyExqCDNi0JldIRpknndrATfh8+2mOQ==&caltotMartTpcd=11";  // API URL을 여기에 입력하세요
        StockDTO response = restTemplate.getForObject(apiUrl, StockDTO.class);
        return response;
    }
}