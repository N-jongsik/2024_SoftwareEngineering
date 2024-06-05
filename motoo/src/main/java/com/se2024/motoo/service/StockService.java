package com.se2024.motoo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.se2024.motoo.dto.StockDTO;
import com.se2024.motoo.dto.StockInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {

    private final RestTemplate restTemplate;

    @Autowired
    public StockService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public StockInfoResponse getStockInfo(String itemName) {
        // 호출된 시점의 어제 날짜 구하기
        LocalDate yesterday = LocalDate.now().minusDays(1);
        String yesterdayStr = yesterday.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String apiUrl = "https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo";
        String serviceKey = "WkiWHxfMQMxWZ2BFbkUi62BgCOv%2BCMoPtKMQnU%2F8hViLc0Dl%2BmeP1koWyExqCDNi0JldIRpknndrATfh8%2B2mOQ%3D%3D";
        String apiResponse = callExternalApi(apiUrl, serviceKey, yesterdayStr, itemName);

        return parseJsonResponse(apiResponse);
    }

    private String callExternalApi(String apiUrl, String serviceKey, String date, String itemName) {
        return restTemplate.getForObject(
                apiUrl + "?serviceKey=" + serviceKey + "&resultType=json&beginBasDt=" + date + "&likeItmsNm=" + itemName,
                String.class
        );
    }

    private StockInfoResponse parseJsonResponse(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // JSON 문자열을 StockInfoResponse 객체로 변환
            JsonNode rootNode = objectMapper.readTree(json);
            JsonNode itemNode = rootNode.path("response").path("body").path("items").path("item");
            List<StockDTO> stockItems = new ArrayList<>();
            if (itemNode.isArray()) {
                for (JsonNode node : itemNode) {
                    StockDTO stockItem = new StockDTO();
                    stockItem.setBasDt(node.path("basDt").asText());
                    stockItem.setSrtnCd(node.path("srtnCd").asText());
                    stockItem.setIsinCd(node.path("isinCd").asText());
                    stockItem.setMrktCtg(node.path("mrktCtg").asText());
                    stockItem.setItmsNm(node.path("itmsNm").asText());
                    stockItem.setCrno(node.path("crno").asText());
                    stockItem.setCorpNm(node.path("corpNm").asText());
                    stockItems.add(stockItem);
                }
            }
            StockInfoResponse response = new StockInfoResponse();
            response.setItems(stockItems);
            return response;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
