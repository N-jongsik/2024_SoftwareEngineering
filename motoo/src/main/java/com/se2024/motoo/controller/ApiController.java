package com.se2024.motoo.controller;

import com.se2024.motoo.domain.Board;
import com.se2024.motoo.dto.BoardDTO;
import com.se2024.motoo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ApiController {
    private final BoardService boardService;

    @GetMapping({"/", "/post.html"})
    public String post(Model model) {
        List<BoardDTO>boardlist = boardService.getAllBoards();
        //System.out.println("\n\n\n"+boardlist.get(0).getTitle()+"\n\n\n");
        model.addAttribute("boards", boardlist);
        return "post";
    }

    @GetMapping("/discussion.html") //discussion이 게시물 글쓰고 업로드하는 뷰
    public String discussion(Model model) {
        //토큰에서 사용자 아이디 추출해야 함.
        //@RequestHeader
        model.addAttribute("board", new Board());
        return "discussion"; // discussion.html view template 반환
    }

    @GetMapping("/boardview.html/{board_id}") //discussion이 게시물 글쓰고 업로드하는 뷰
    public String BoardView(Model model, @PathVariable Long board_id) {
        try{
            BoardDTO board = boardService.getBoardById(board_id);
            model.addAttribute("board", board);
            return "boardview";
        }
        catch(Exception e){
            return "Error";
        }
    }

}
