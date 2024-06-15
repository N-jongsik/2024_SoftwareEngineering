package com.se2024.motoo.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.se2024.motoo.dto.MarketIndexDTO;
import com.se2024.motoo.dto.ResponseOutputDTO;
import com.se2024.motoo.dto.testDTO;
import com.se2024.motoo.dto.tickerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class KisService {
    @Value("${appkey}")
    private String appkey;
    @Value("${appsecret}")
    private String appSecret;
    @Value("${access_token}")
    private String accessToken;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Autowired
    public KisService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.baseUrl("https://openapi.koreainvestment.com:9443").build();
        this.objectMapper = objectMapper;
    }
    // 시장지수 조회
    private HttpHeaders createIndexHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
        headers.set("appkey", appkey);
        headers.set("appSecret", appSecret);
        headers.set("tr_id", "FHPUP02100000");
        headers.set("custtype", "P");
        return headers;
    }

    public Mono<MarketIndexDTO> getMarketIndex(String fidInputIscd) {
        HttpHeaders headers = createIndexHttpHeaders();
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/quotations/inquire-index-price")
                        .queryParam("FID_COND_MRKT_DIV_CODE", "U")
                        .queryParam("FID_INPUT_ISCD", fidInputIscd)
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::parseMarketIndex);
    }

    private Mono<MarketIndexDTO> parseMarketIndex(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode outputNode = rootNode.path("output");
            MarketIndexDTO dto = objectMapper.treeToValue(outputNode, MarketIndexDTO.class);
            return Mono.just(dto);
        } catch (Exception e) {
            e.printStackTrace();
            return Mono.error(new RuntimeException("Failed to parse response"));
        }
    }

    // 거래량순
    private HttpHeaders createVolumeRankHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
        headers.set("appkey", appkey);
        headers.set("appSecret", appSecret);
        headers.set("tr_id", "FHPST01710000");
        headers.set("custtype", "P");
        return headers;
    }
    public Mono<List<ResponseOutputDTO>> getVolumeRank() {
        HttpHeaders headers = createVolumeRankHttpHeaders();
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/quotations/volume-rank")
                        .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                        .queryParam("FID_COND_SCR_DIV_CODE", "20171")
                        .queryParam("FID_INPUT_ISCD", "0002")
                        .queryParam("FID_DIV_CLS_CODE", "0")
                        .queryParam("FID_BLNG_CLS_CODE", "0")
                        .queryParam("FID_TRGT_CLS_CODE", "111111111")
                        .queryParam("FID_TRGT_EXLS_CLS_CODE", "000000")
                        .queryParam("FID_INPUT_PRICE_1", "0")
                        .queryParam("FID_INPUT_PRICE_2", "0")
                        .queryParam("FID_VOL_CNT", "0")
                        .queryParam("FID_INPUT_DATE_1", "0")
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::parseFVolumeRank);
    }
    private Mono<List<ResponseOutputDTO>> parseFVolumeRank(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode outputNode = rootNode.get("output");
            if (outputNode != null) {
                List<ResponseOutputDTO> responseDataList = objectMapper.convertValue(outputNode, new TypeReference<List<ResponseOutputDTO>>() {});
                return Mono.just(responseDataList);
            } else {
                return Mono.just(List.of());
            }
        } catch (Exception e) {
            return Mono.error(e);
        }
    }

    // 상승,하락 률순
    private HttpHeaders createIncreaseRankHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
        headers.set("appkey", appkey);
        headers.set("appSecret", appSecret);
        headers.set("tr_id", "FHPST01700000");
        headers.set("custtype", "P");
        return headers;
    }
    public Mono<List<testDTO>> getIncreaseRank() {
        HttpHeaders headers = createIncreaseRankHttpHeaders();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/ranking/fluctuation")
                        .queryParam("fid_rsfl_rate2", "") // 문서에 설명된 대로
                        .queryParam("fid_cond_mrkt_div_code", "J")
                        .queryParam("fid_cond_scr_div_code", "20170")
                        .queryParam("fid_input_iscd", "0000")
                        .queryParam("fid_rank_sort_cls_code", "0")
                        .queryParam("fid_input_cnt_1", "0")
                        .queryParam("fid_prc_cls_code", "0")
                        .queryParam("fid_input_price_1", "")
                        .queryParam("fid_input_price_2", "")
                        .queryParam("fid_vol_cnt", "")
                        .queryParam("fid_trgt_cls_code", "0")
                        .queryParam("fid_trgt_exls_cls_code", "0")
                        .queryParam("fid_div_cls_code", "0")
                        .queryParam("fid_rsfl_rate1", "")
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::parseFIncreaseRank);
    }
    public Mono<List<testDTO>> getDecreaseRank() {
        HttpHeaders headers = createIncreaseRankHttpHeaders();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/ranking/fluctuation")
                        .queryParam("fid_rsfl_rate2", "") // 문서에 설명된 대로
                        .queryParam("fid_cond_mrkt_div_code", "J")
                        .queryParam("fid_cond_scr_div_code", "20170")
                        .queryParam("fid_input_iscd", "0000")
                        .queryParam("fid_rank_sort_cls_code", "1")
                        .queryParam("fid_input_cnt_1", "0")
                        .queryParam("fid_prc_cls_code", "0")
                        .queryParam("fid_input_price_1", "")
                        .queryParam("fid_input_price_2", "")
                        .queryParam("fid_vol_cnt", "")
                        .queryParam("fid_trgt_cls_code", "0")
                        .queryParam("fid_trgt_exls_cls_code", "0")
                        .queryParam("fid_div_cls_code", "0")
                        .queryParam("fid_rsfl_rate1", "")
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::parseFIncreaseRank);
    }
    private Mono<List<testDTO>> parseFIncreaseRank(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode outputNode = rootNode.get("output");
            if (outputNode != null) {
                List<testDTO> responseDataList = objectMapper.convertValue(outputNode, new TypeReference<List<testDTO>>() {});
                return Mono.just(responseDataList);
            } else {
                return Mono.just(List.of());
            }
        } catch (Exception e) {
            return Mono.error(e);
        }
    }
    // 종목 코드 조회
    private HttpHeaders createPriceHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
        headers.set("appkey", appkey);
        headers.set("appSecret", appSecret);
        headers.set("tr_id", "FHKST01010100");
        headers.set("custtype", "P");
        return headers;
    }
    private String ticker;
    public Mono<List<tickerDTO>> getPirce(String ticker) {
        HttpHeaders headers = createPriceHttpHeaders();
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/uapi/domestic-stock/v1/quotations/inquire-price")
                        .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                        .queryParam("FID_INPUT_ISCD", ticker)
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::parsePrice);
    }

    private Mono<List<tickerDTO>> parsePrice(String response){
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode outputNode = rootNode.path("output");
            tickerDTO dto = objectMapper.treeToValue(outputNode, tickerDTO.class);
            return Mono.just(List.of(dto));
        } catch (Exception e) {
            e.printStackTrace();
            return Mono.error(new RuntimeException("Failed to parse response"));
        }
    }
    private String getNodeText(JsonNode node, String fieldName) {
        JsonNode fieldNode = node.get(fieldName);
        return fieldNode != null ? fieldNode.asText() : "";
    }
}
