package com.se2024.motoo.dto;

import com.se2024.motoo.domain.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
//@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private Long boardId;
    private String userId;
    private String content;

    public CommentDTO(){
        super();
    }
    public static CommentDTO fromEntity(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setBoardId(comment.getBoard().getId());
        dto.setUserId(comment.getUserId());
        dto.setContent(comment.getContent());
        return dto;
    }
}
