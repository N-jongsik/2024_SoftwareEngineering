package com.se2024.motoo.controller;

import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.service.BoardService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("api/board") //게시물 업로드
    public RedirectView createBoard(@ModelAttribute("board") BoardDTO boardDTO, HttpSession session) {
        String userId = (String)session.getAttribute("loginID");
        //String userId = boardDTO.getTitle(); //임시로,,
        if(userId != null){ //로그인 안되어있을 경우엔 로그인화면으로
            boardDTO.setUser_id(userId);
            boardService.createBoard(boardDTO, true);
            return new RedirectView("/post.html");
        }else{
            return new RedirectView("/login");
        }
    }

    @PostMapping("api/notice") //공지글 업로드
    public RedirectView createNotice(@ModelAttribute("board") BoardDTO boardDTO, HttpSession session) {
        String userId = (String)session.getAttribute("loginID");
        //String userId = boardDTO.getTitle(); //임시로,,
        if(userId != null){ //관리자 id일 때에만 notice <<<<<<<<<<<<<<<<<<<<<<<<<관리자 id 확인으로 수정하기
            boardDTO.setUser_id(userId);
            boardService.createBoard(boardDTO, false);
            return new RedirectView("/noticeList.html");
        }else{ //로그인이 안되어있다면 이 contoller로 넘어오면 안되는데
         return new RedirectView("/login");
        }
    }

    @PostMapping("api/board/{board_id}") //게시물 수정
    public RedirectView updateBoard(@ModelAttribute("board") BoardDTO boardDTO, @PathVariable("board_id")Long board_id) {
        BoardDTO updatedBoard = boardService.updateBoard(board_id, boardDTO);
        return new RedirectView("/post.html");
    }

    @PostMapping("api/board/{board_id}/like") //게시물 따봉 눌렀을 때
    public RedirectView updateLike(@ModelAttribute("board") BoardDTO boardDTO, @PathVariable("board_id")Long board_id) {
        boardService.updateLikecount(board_id);
        return new RedirectView("/boardview.html/{board_id}");
    }

    @PostMapping("api/notice/{board_id}") //공지글 수정
    public RedirectView updateNotice(@ModelAttribute("board") BoardDTO boardDTO, @PathVariable("board_id")Long board_id) {
        BoardDTO updatedBoard = boardService.updateBoard(board_id, boardDTO);
        return new RedirectView("/noticeList.html");
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Long id) {
        BoardDTO boardDTO = boardService.getBoardById(id);
        return ResponseEntity.ok(boardDTO);
    }

    @GetMapping("/{id}/tmp")
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoards();
        return ResponseEntity.ok(boards);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
}
