package com.se2024.motoo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class Board {
    @Id
    @Column(name="id", nullable=false )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long board_id;

    @Column
    private Long user_id;

    @Column
    @CreatedDate
    private LocalDateTime create_at;

    @Column
    @LastModifiedDate
    private LocalDateTime modified_at;

    @Column
    private String title;

    @Column
    private String content;
}
