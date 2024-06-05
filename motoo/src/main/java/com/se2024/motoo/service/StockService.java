package com.se2024.motoo.service;

import com.se2024.motoo.domain.Stock;
import com.se2024.motoo.dto.StockDTO;
import com.se2024.motoo.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    private final RestTemplate restTemplate;

    public StockService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void getKOSPIInfoFromAPI() {
        String url = "http://api.seibro.or.kr/openapi/service/StockSvc/getKDRSecnInfo?serviceKey=WkiWHxfMQMxWZ2BFbkUi62BgCOv+CMoPtKMQnU/8hViLc0Dl+meP1koWyExqCDNi0JldIRpknndrATfh8+2mOQ==&caltotMartTpcd=11";
        String response = restTemplate.getForObject(url, String.class);

        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(StockDTO.class);
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            StockDTO stockDTO = (StockDTO) unmarshaller.unmarshal(new StringReader(response));

            if (stockDTO.getBody() != null && stockDTO.getBody().getItemContainer() != null) {
                List<StockDTO.Item> items = stockDTO.getBody().getItemContainer().getItems();
                if (items != null) {
                    for (StockDTO.Item item : items) {
                        Stock stock = new Stock();
                        stock.setKdrIsin(item.getKdrIsin());
                        stock.setKorSecnNm(item.getKorSecnNm());
                        stock.setListDt(item.getListDt());
                        stock.setOvsListStkmkCd(item.getOvsListStkmkCd());
                        stockRepository.save(stock);
                    }
                } else {
                    System.out.println("Items list is null");
                }
            } else {
                System.out.println("Body or ItemContainer is null");
            }
        } catch (JAXBException e) {
            e.printStackTrace();
        }
    }
}
