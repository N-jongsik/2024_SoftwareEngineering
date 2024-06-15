package com.se2024.motoo.dto;

import jakarta.persistence.Lob;
import lombok.*;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class QuizDTO {
    private Long id;
    private String userID;
    private String question;
    private Boolean answer;
}
