package com.se2024.motoo.dto;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.List;

@Getter
@Setter
@XmlRootElement(name = "response")
@XmlAccessorType(XmlAccessType.FIELD)
public class StockDTO {

    @XmlElement(name = "header")
    private Header header;

    @XmlElement(name = "body")
    private Body body;

    @Getter
    @Setter
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Header {
        @XmlElement(name = "resultCode")
        private String resultCode;

        @XmlElement(name = "resultMsg")
        private String resultMsg;
    }

    @Getter
    @Setter
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Body {
        @XmlElement(name = "items")
        private ItemContainer itemContainer; // 필드 이름 변경
    }

    @Getter
    @Setter
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class ItemContainer {
        @XmlElement(name = "item")
        private List<Item> items; // 클래스 이름 변경
    }

    @Getter
    @Setter
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(propOrder = {"kdrIsin", "korSecnNm", "listDt", "ovsListStkmkCd"})
    public static class Item {
        @XmlElement(name = "kdrIsin")
        private String kdrIsin;

        @XmlElement(name = "korSecnNm")
        private String korSecnNm;

        @XmlElement(name = "listDt")
        private String listDt;

        @XmlElement(name = "ovsListStkmkCd")
        private String ovsListStkmkCd;
    }
}
