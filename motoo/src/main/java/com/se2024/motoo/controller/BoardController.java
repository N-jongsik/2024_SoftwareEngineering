package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Member;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.dto.CommentDTO;
import com.se2024.motoo.service.BoardService;
import com.se2024.motoo.service.CommentService;
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

    private final CommentService commentService;
    @PostMapping("/api/board") //게시물 업로드
    public ResponseEntity<?> createBoard(@RequestBody BoardDTO boardDTO, HttpSession session) {
                //유저 id 가져오는거 수정
                //String userId = (String) session.getAttribute("loginID");
        Member userId = (Member) session.getAttribute("loginID");
        //String userId = (String) "loginID";
        if (userId != null) {
            boardDTO.setUserID(userId);
            boardService.createBoard(boardDTO, 0);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
    }

//    @PostMapping("/api/board") //게시물 업로드
//    public ResponseEntity<?> createBoard(@RequestBody BoardDTO boardDTO){//, HttpSession session) {
//        //유저 id 가져오는거 수정
//        //String userId = (String) session.getAttribute("loginID");
//        //Member userId = (Member) session.getAttribute("loginID");
//        String userId = (String) "loginID";
//        if (userId != null) {
//            boardDTO.setUserID(null);
//            boardService.createBoard(boardDTO, 0);
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
//        }
//    }

    @PostMapping("/api/notice") //공지글 업로드
    public ResponseEntity<?> createNotice(@RequestBody BoardDTO boardDTO, HttpSession session) {
        //유저 id 가져오는거 수정
        Member userId = (Member)session.getAttribute("loginID");
        if (userId != null) {
            boardDTO.setUserID(userId);
            boardService.createBoard(boardDTO, 1);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
    }
    @PostMapping("/api/qna") //문의사항 업로드
    public ResponseEntity<?> createQnA(@RequestBody BoardDTO boardDTO, HttpSession session) {
        //유저 id 가져오는거 수정

        Member userId = (Member)session.getAttribute("loginID");

        if (userId != null) {
            boardDTO.setUserID(userId);
            boardService.createBoard(boardDTO, 2);
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

    @PostMapping("/api/qna/{board_id}") //문의사항 수정
    public ResponseEntity<?> updateQnA(@RequestBody BoardDTO boardDTO, @PathVariable("board_id") Long board_id) {
        boardService.updateBoard(board_id, boardDTO);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/api/notice/{board_id}") //공지글 수정
    public ResponseEntity<?> updateNotice(@RequestBody BoardDTO boardDTO, @PathVariable("board_id") Long board_id) {
        boardService.updateBoard(board_id, boardDTO);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/api/board/{board_id}") // 게시물 조회
    public ResponseEntity<?> getBoard(@PathVariable("board_id") Long board_id) {
        BoardDTO boardDTO = boardService.getBoardById(board_id);
        return ResponseEntity.ok(boardDTO);
    }
    @GetMapping("/api/notice/{board_id}") // 공지글 조회
    public ResponseEntity<?> getNotice(@PathVariable("board_id") Long board_id) {
        BoardDTO boardDTO = boardService.getBoardById(board_id);
        boardService.updateViewcount(board_id);
        return ResponseEntity.ok(boardDTO);
    }


    @PostMapping("/api/notice/{board_id}/delete")
    public ResponseEntity<?> deleteNotice(@PathVariable("board_id") Long board_id) {
        try {
            boardService.deleteBoard(board_id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/api/boards/{board_id}/delete")
    public ResponseEntity<?> deleteBoard(@PathVariable("board_id") Long board_id) {
        try {
            boardService.deleteBoard(board_id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/api/qna/{board_id}/delete")
    public ResponseEntity<?> deleteQnA(@PathVariable("board_id") Long board_id) {
        try {
            boardService.deleteBoard(board_id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/api/boards/{board_id}/increment-viewcount")
    public ResponseEntity<?> incrementViewCount(@PathVariable("board_id") Long board_id) {
        try {
            boardService.updateViewcount(board_id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/api/boards/{board_id}/like")
    public ResponseEntity<?> updateLike(@PathVariable("board_id") Long board_id) {
        try {
            boardService.updateLikecount(board_id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/api/boards/{boardId}/comments")
    public ResponseEntity<?> createComment(@PathVariable("boardId") Long boardId, @RequestBody CommentDTO commentDTO) {
        commentDTO.setBoardId(boardId);
        CommentDTO createdComment = commentService.createComment(commentDTO);
        return ResponseEntity.ok(createdComment);
    }

    @GetMapping("/api/boards/{boardId}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByBoardId(@PathVariable("boardId") Long boardId) {
        List<CommentDTO> comments = commentService.getCommentsByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}