package com.se2024.motoo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.se2024.motoo.dto.UserStockDTO;
import com.se2024.motoo.dto.StockInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {

    private final RestTemplate restTemplate;
    private final String apiUrl;
    private final String serviceKey;
    @Autowired
    public StockService(RestTemplate restTemplate, @Value("${stock.api.url}") String apiUrl, @Value("${stock.api.key}") String serviceKey) {
        this.restTemplate = restTemplate;
        this.apiUrl = apiUrl;
        this.serviceKey = serviceKey;
    }

    public StockInfoResponse getStockInfo(String itemName) {
        String apiResponse = callExternalApi(itemName);
        return parseJsonResponse(apiResponse);
    }

    private String callExternalApi(String itemName) {
        try {
            String encodedItemName = URLEncoder.encode(itemName, StandardCharsets.UTF_8.toString());
            String encodedServiceKey = URLEncoder.encode(serviceKey, StandardCharsets.UTF_8.toString());

            String url = String.format("%s?serviceKey=%s&resultType=json&basDt=20240613&likeItmsNm=%s",
                    apiUrl, encodedServiceKey, encodedItemName);
            URI uri = new URI(url);
            System.out.println(">>>>>>>>>>>>>>>>>>>>>> " + url);

            return restTemplate.getForObject(uri, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("API 호출 중 오류 발생: " + e.getMessage(), e);
        }
    }

    private StockInfoResponse parseJsonResponse(String json) {
        if (json == null || json.startsWith("<")) {
            System.err.println("API 응답이 예상한 JSON 형식이 아닙니다: " + json);
            throw new IllegalArgumentException("API 응답이 예상한 JSON 형식이 아닙니다.");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(json);
            JsonNode itemNode = rootNode.path("response").path("body").path("items").path("item");
            List<UserStockDTO> stockItems = new ArrayList<>();
            if (itemNode.isArray()) {
                for (JsonNode node : itemNode) {
                    UserStockDTO stockItem = new UserStockDTO();
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
            throw new RuntimeException("JSON 응답 처리 중 오류 발생: " + e.getMessage(), e);
        }
    }
}
