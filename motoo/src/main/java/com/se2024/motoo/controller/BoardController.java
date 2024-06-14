package com.se2024.motoo.controller;

import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.view.RedirectView;
@RestController
@RequiredArgsConstructor
public class BoardController { //게시판과 공지사항 controller

    private final BoardService boardService;

    @PostMapping("/api/board") //게시물 업로드
    public ResponseEntity<?> createBoard(@RequestBody BoardDTO boardDTO){//}, HttpSession session) {
        //유저 id 가져오는거 수정
        //String userId = (String) session.getAttribute("loginID");
        String userId = boardDTO.getTitle();
        if (userId != null) {
            boardDTO.setUser_id(userId);
            boardService.createBoard(boardDTO, true);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
    }

    @PostMapping("/api/notice") //공지글 업로드
    public ResponseEntity<?> createNotice(@RequestBody BoardDTO boardDTO, HttpSession session) {
        String userId = (String) session.getAttribute("loginID");
        if (userId != null) {
            boardDTO.setUser_id(userId);
            boardService.createBoard(boardDTO, false);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
    }

    @PostMapping("/api/board/{board_id}") //게시물 수정
    public ResponseEntity<?> updateBoard(@RequestBody BoardDTO boardDTO, @PathVariable("board_id") Long board_id) {
        BoardDTO existingBoard = boardService.getBoardById(board_id);
        if (existingBoard != null) {
            // 기존 조회수와 공감 수 유지
            boardDTO.setViewCount(existingBoard.getViewCount());
            boardDTO.setLikeCount(existingBoard.getLikeCount());
            boardService.updateBoard(board_id, boardDTO);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Board not found");
        }
    }
    @GetMapping("/api/board/{board_id}") // 게시물 조회
    public ResponseEntity<?> getBoard(@PathVariable("board_id") Long board_id) {
        BoardDTO boardDTO = boardService.getBoardById(board_id);
        return ResponseEntity.ok(boardDTO);
    }
/*
    @PostMapping("api/board/{board_id}/like") //게시물 따봉 눌렀을 때
    public RedirectView updateLike(@ModelAttribute("board") BoardDTO boardDTO, @PathVariable("board_id")Long board_id) {
        boardService.updateLikecount(board_id);
        return new RedirectView("/boardview.html/{board_id}");
    }
*/
    @PostMapping("/api/notice/{board_id}") //공지글 수정
    public ResponseEntity<?> updateNotice(@RequestBody BoardDTO boardDTO, @PathVariable("board_id") Long board_id) {
        boardService.updateBoard(board_id, boardDTO);
        return ResponseEntity.ok().build();
    }

}
