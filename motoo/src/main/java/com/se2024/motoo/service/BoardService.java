package com.se2024.motoo.service;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.repository.BoardRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardDTO createBoard(BoardDTO boardDTO, Integer isboard) {
        Board board = new Board();
        board.setUserID(boardDTO.getUserID());
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());
        board.setCreate_at(LocalDateTime.now());
        board.setModified_at(LocalDateTime.now());
        board.setBoard_type(boardDTO.getBoard_type());
        board.setViewCount(0);
        board.setLikeCount(0);
        board.setIsBoard(isboard);
        board = boardRepository.save(board);
        return BoardDTO.fromEntity(board);
    }

    public BoardDTO getBoardById(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        return BoardDTO.fromEntity(board);
    }

    public List<BoardDTO> getAllBoards() { //업로드된 board를 가져옴
        return boardRepository.findAll().stream()
                .map(BoardDTO::fromEntity)
                .filter(boardDTO -> boardDTO.getIsBoard() != null && boardDTO.getIsBoard() == 0)
                .collect(Collectors.toList());
    }

    public List<BoardDTO> getAllNotices() { //업로드된 board를 가져옴
        return boardRepository.findAll().stream()
                .map(BoardDTO::fromEntity)
                .filter(boardDTO -> boardDTO.getIsBoard() != null && boardDTO.getIsBoard() == 1)
                .collect(Collectors.toList());
    }
    public List<BoardDTO> getAllQnAs() { //업로드된 board를 가져옴
        return boardRepository.findAll().stream()
                .map(BoardDTO::fromEntity)
                .filter(boardDTO -> boardDTO.getIsBoard() != null && boardDTO.getIsBoard() == 2)
                .collect(Collectors.toList());
    }

    public BoardDTO updateBoard(Long id, BoardDTO boardDTO) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());
        board.setModified_at(LocalDateTime.now());
        board.setBoard_type(boardDTO.getBoard_type());
        board = boardRepository.save(board);
        return BoardDTO.fromEntity(board);
    }
    public BoardDTO updateViewcount(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        Integer boardview = board.getViewCount()+1;
        board.setViewCount(boardview);
        board = boardRepository.save(board);
        return BoardDTO.fromEntity(board);
    }

    public BoardDTO updateLikecount(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        Integer boardlike = board.getLikeCount()+1;
        board.setLikeCount(boardlike);
        board = boardRepository.save(board);
        return BoardDTO.fromEntity(board);
    }

    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
