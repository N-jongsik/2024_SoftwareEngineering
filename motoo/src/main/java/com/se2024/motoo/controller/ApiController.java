package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.dto.SignupResponseDTO;
import com.se2024.motoo.repository.MemberRepository;
import com.se2024.motoo.service.BoardService;
import com.se2024.motoo.dto.SignupDTO;
import com.se2024.motoo.service.MemberService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequiredArgsConstructor
public class ApiController {
    private final BoardService boardService;
    private final MemberRepository memberRepository;

    @GetMapping("/api/boards")
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        try {
            List<BoardDTO> boardList = boardService.getAllBoards();
            return ResponseEntity.ok(boardList);
        } catch (Exception e) {
            // 로그에 에러 메시지 출력
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/api/notice")
    public ResponseEntity<List<BoardDTO>> getAllNotices() {
        List<BoardDTO> boardlist = boardService.getAllNotices();
        return ResponseEntity.ok(boardlist);
    }

    @GetMapping("/api/qna")
    public ResponseEntity<List<BoardDTO>> getAllQnAs() {
        List<BoardDTO> boardlist = boardService.getAllQnAs();
        return ResponseEntity.ok(boardlist);
    }

    @GetMapping("/api/boards/{board_id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable("board_id") Long board_id) {
        try {
            BoardDTO board = boardService.getBoardById(board_id);
            boardService.updateViewcount(board_id);
            return ResponseEntity.ok(board);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/api/qna/{board_id}")
    public ResponseEntity<BoardDTO> getQnAById(@PathVariable("board_id") Long board_id) {
        try {
            BoardDTO board = boardService.getBoardById(board_id);
            return ResponseEntity.ok(board);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/api/boards/{board_id}/like")
    public ResponseEntity<BoardDTO> getAfterLike(@PathVariable("board_id") Long board_id) {
        try {
            BoardDTO board = boardService.getBoardById(board_id);
            return ResponseEntity.ok(board);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private final MemberService memberService;
        // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        System.out.println("사용자 로그아웃!!!!!!!!!!!");
        return "redirect:/login?logout=true";
    }



}
