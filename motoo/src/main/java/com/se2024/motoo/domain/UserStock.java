package com.se2024.motoo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.yaml.snakeyaml.events.Event;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserStock{
    @Id
    @ManyToOne
    @JoinColumn(name = "userid")
    private Member userID;

    @Column(length = 100)
    private String itemName;

    @Column(length = 10)
    private String srtnCd;

    @Column
    private Integer price;

    @Column
    private Integer quantity;

}
