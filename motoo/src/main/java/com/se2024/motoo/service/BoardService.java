package com.se2024.motoo.service;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardDTO createBoard(BoardDTO boardDTO, HttpServletRequest request) {
        Board board = new Board();
        board.setUser_id(boardDTO.getUser_id());
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());
        board = boardRepository.save(board);
        return BoardDTO.fromEntity(board);
    }

    public BoardDTO getBoardById(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        return BoardDTO.fromEntity(board);
    }

    public List<BoardDTO> getAllBoards() {
        return boardRepository.findAll().stream().map(BoardDTO::fromEntity).collect(Collectors.toList());
    }

    public BoardDTO updateBoard(Long id, BoardDTO boardDTO) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());
        board = boardRepository.save(board);
        return BoardDTO.fromEntity(board);
    }

    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
