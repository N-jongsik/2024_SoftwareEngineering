//package com.se2024.motoo.service;
//
//import com.se2024.motoo.domain.Board;
//import com.se2024.motoo.domain.UserStock;
//import com.se2024.motoo.dto.BoardDTO;
//import com.se2024.motoo.dto.UserStockDTO;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//
//@Service
//public class UserStockService {
//    public UserStockDTO buyStock(UserStockDTO userStockDTO) {
//        UserStock userStock = new UserStock();
//        userStock.setUserID(userStockDTO.getUserID());
//        userStock.setTitle(boardDTO.getTitle());
//        userStock.setContent(boardDTO.getContent());
//        userStock.setCreate_at(LocalDateTime.now());
//        userStock.setModified_at(LocalDateTime.now());
//        userStock.setBoard_type(boardDTO.getBoard_type());
//        userStock.setViewCount(0);
//        userStock.setLikeCount(0);
//        userStock.setIsBoard(isboard);
//        userStock = boardRepository.save(board);
//        return BoardDTO.fromEntity(board);
//    }
//}
