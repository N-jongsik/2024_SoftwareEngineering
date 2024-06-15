//package com.se2024.motoo.controller;
//
//import com.se2024.motoo.domain.Member;
//import com.se2024.motoo.dto.BoardDTO;
//import com.se2024.motoo.service.BoardService;
//import com.se2024.motoo.service.CommentService;
//import com.se2024.motoo.service.UserStockService;
//import jakarta.servlet.http.HttpSession;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//public class UserStockController {
//    private final UserStockService userstockService;
//
//    @PostMapping("/api/order") //게시물 업로드
//    public ResponseEntity<?> createBoard(@RequestBody BoardDTO boardDTO, HttpSession session) {
//        //유저 id 가져오는거 수정
//        //String userId = (String) session.getAttribute("loginID");
//        Member userId = (Member) session.getAttribute("loginID");
//        if (userId != null) {
//            boardDTO.setUserID(userId);
//            userstockService.createBoard(boardDTO, 0);
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
//        }
//    }
//}
