package com.se2024.motoo.dto;

import com.se2024.motoo.domain.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
//@NoArgsConstructor
public class BoardDTO {
    private Long board_id;
    private String user_id;
    private LocalDateTime create_at;
    private LocalDateTime modified_at;
    private String title;
    private String content;

    public BoardDTO(){
        super();
    }
    public BoardDTO(Long board_id, String user_id, LocalDateTime create_at, LocalDateTime modified_at, String title, String content) {
        this.board_id = board_id;
        this.user_id = user_id;
        this.create_at = create_at;
        this.modified_at = modified_at;
        this.title = title;
        this.content = content;
    }

    // 예를 들어, 엔티티에서 DTO로 변환하는 메서드
    public static BoardDTO fromEntity(Board board) {
        return new BoardDTO(
                board.getBoard_id(),
                board.getUser_id(),
                board.getCreate_at(),
                board.getModified_at(),
                board.getTitle(),
                board.getContent()
        );
    }
}
