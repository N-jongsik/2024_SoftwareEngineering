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
    private String pwd;

    @Column(length = 100)
    private String bstp_kor_isnm;

    @Column(length = 100)
    private Integer stck_prpr;
}
