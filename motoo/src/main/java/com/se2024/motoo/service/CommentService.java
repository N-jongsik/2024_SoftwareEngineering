package com.se2024.motoo.service;

import com.se2024.motoo.domain.Comment;
import com.se2024.motoo.dto.CommentDTO;
import com.se2024.motoo.repository.CommentRepository;
import com.se2024.motoo.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    public CommentDTO createComment(CommentDTO commentDTO) {
        System.out.println("/n/nCreating comment for boardId:"+ commentDTO.getBoardId());
        Comment comment = new Comment();
        System.out.println("Finding board with id: {}"+ commentDTO.getBoardId());
        comment.setBoard(boardRepository.findById(commentDTO.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found")));

        System.out.println("Setting userId: {}"+ commentDTO.getUserId());
        comment.setUserId(commentDTO.getUserId());

        System.out.println("Setting content: " + commentDTO.getContent());
        comment.setContent(commentDTO.getContent());
        try{
            System.out.println("Saving comment");
            comment = commentRepository.save(comment);
            System.out.println("Comment created successfully with id: {}"+comment.getId());
        }catch (DataAccessException ex) {
            // 예외 처리
            System.err.println("Failed to save comment: " + ex.getMessage());
        }
        return CommentDTO.fromEntity(comment);
    }

    public List<CommentDTO> getCommentsByBoardId(Long boardId) {
        return commentRepository.findByBoardId(boardId).stream()
                .map(CommentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
