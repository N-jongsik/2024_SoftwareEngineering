package com.se2024.motoo.controller;

import com.se2024.motoo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
@RequiredArgsConstructor
public class ApiController {
    private final BoardService boardService;

    @GetMapping({"/", "/templates/post.html"})
    public String post(Model model) {
        return "post";
    }

    @GetMapping("/discussion.html") //discussion이 게시물 글쓰고 업로드하는 뷰
    public String discussion(Model model) {
        return "discussion"; // discussion.html view template 반환
    }
}
